import bcrypt from 'bcrypt';
import userService from '../services/UserService.js';

class UserController {
    async getAll(req, res) {
        try {
            const users =
                await userService.getAll();

            res.json({
                message: 'Success',
                data: users,
            });
        } catch (err) {
            res.status(500).json({
                message:
                    'Error al obtener usuarios',
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;

            const user =
                await userService.getById(id);

            if (!user) {
                return res.status(404).json({
                    message:
                        'Usuario no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: user,
            });
        } catch (err) {
            res.status(500).json({
                message:
                    'Error al obtener el usuario',
            });
        }
    }

    async create(req, res) {
        try {
            const {
                name,
                email,
                password,
                role,
            } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    message:
                        'Faltan parámetros obligatorios',
                });
            }

            const normalizedEmail =
                email.trim().toLowerCase();

            const exists =
                await userService.findByEmail(
                    normalizedEmail,
                );

            if (exists) {
                return res.status(409).json({
                    message:
                        'Ya existe un usuario con ese correo',
                });
            }

            const passwordHash =
                await bcrypt.hash(password, 10);

            const user =
                await userService.create({
                    name: name.trim(),
                    email: normalizedEmail,
                    password: passwordHash,
                    role,
                });

            await userService.synchronizeTeacher(
                user,
            );

            return res.status(201).json({
                message:
                    'Usuario creado correctamente',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    active: user.active,
                    profileImage:
                        user.profileImage,
                    createdAt: user.createdAt,
                },
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message:
                    'Error al crear el usuario',
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const {
                name,
                email,
                password,
                role,
                active,
            } = req.body;

            if (!name || !email || !role) {
                return res.status(400).json({
                    message:
                        'Faltan parámetros obligatorios',
                });
            }

            const normalizedEmail =
                email.trim().toLowerCase();

            const emailExists =
                await userService.emailExists(
                    normalizedEmail,
                    id,
                );

            if (emailExists) {
                return res.status(409).json({
                    message:
                        'Ya existe otro usuario con ese correo',
                });
            }

            const data = {
                name: name.trim(),
                email: normalizedEmail,
                role,
                active,
            };

            if (password) {
                data.password =
                    await bcrypt.hash(
                        password,
                        10,
                    );
            }

            const user =
                await userService.update(
                    id,
                    data,
                );

            if (!user) {
                return res.status(404).json({
                    message:
                        'Usuario no encontrado',
                });
            }

            await userService.synchronizeTeacher(
                user,
            );

            return res.json({
                message: 'Success',
                data: user,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message:
                    'Error al actualizar el usuario',
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const user =
                await userService.delete(id);

            if (!user) {
                return res.status(404).json({
                    message:
                        'Usuario no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: user,
            });
        } catch (err) {
            res.status(500).json({
                message:
                    'Error al eliminar el usuario',
            });
        }
    }

    async getProfile(req, res) {
        try {
            const userId = req.user._id;

            const user =
                await userService.getById(
                    userId,
                );

            if (!user) {
                return res.status(404).json({
                    message:
                        'Usuario no encontrado',
                });
            }

            return res.json({
                message: 'Success',
                data: user,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message:
                    'Error al obtener el perfil',
            });
        }
    }

    async updateProfile(req, res) {
        try {
            const userId = req.user._id;

            const {
                name,
                email,
                password,
            } = req.body;

            if (
                !name ||
                name.trim().length < 3
            ) {
                return res.status(400).json({
                    message:
                        'El nombre debe tener al menos 3 caracteres',
                });
            }

            if (
                !email ||
                !email.includes('@')
            ) {
                return res.status(400).json({
                    message:
                        'El correo electrónico no es válido',
                });
            }

            if (
                password &&
                password.length < 4
            ) {
                return res.status(400).json({
                    message:
                        'La contraseña debe tener al menos 4 caracteres',
                });
            }

            const normalizedEmail =
                email.trim().toLowerCase();

            const emailExists =
                await userService.emailExists(
                    normalizedEmail,
                    userId,
                );

            if (emailExists) {
                return res.status(409).json({
                    message:
                        'Ya existe otro usuario con ese correo',
                });
            }

            const data = {
                name: name.trim(),
                email: normalizedEmail,
            };

            if (password) {
                data.password =
                    await bcrypt.hash(
                        password,
                        10,
                    );
            }

            const user =
                await userService.update(
                    userId,
                    data,
                );

            if (!user) {
                return res.status(404).json({
                    message:
                        'Usuario no encontrado',
                });
            }

            await userService.synchronizeTeacher(
                user,
            );

            return res.json({
                message:
                    'Perfil actualizado correctamente',
                data: user,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message:
                    'Error al actualizar el perfil',
            });
        }
    }

    async uploadProfileImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message:
                        'No se envió ningún archivo',
                });
            }

            const imagePath =
                `/uploads/profiles/${req.file.filename}`;

            const userId = req.user._id;

            const user =
                await userService.updateProfileImage(
                    userId,
                    imagePath,
                );

            if (!user) {
                return res.status(404).json({
                    message:
                        'Usuario no encontrado',
                });
            }

            return res.status(200).json({
                message:
                    'Imagen de perfil actualizada',
                data: user,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message:
                    'Error al actualizar la imagen de perfil',
            });
        }
    }
}

export default new UserController();