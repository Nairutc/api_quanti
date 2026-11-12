import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

class UserController {
    async getAll(req, res) {
        try {
            const users = await User.find().select('-password');

            res.json({
                message: 'Success',
                data: users,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al obtener usuarios',
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;

            const user = await User.findById(id).select('-password');

            if (!user) {
                return res.status(404).json({
                    message: 'Usuario no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: user,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al obtener el usuario',
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

        const exists = await User.findOne({
            email: normalizedEmail,
        });

        if (exists) {
            return res.status(409).json({
                message:
                    'Ya existe un usuario con ese correo',
            });
        }

        const passwordHash =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: passwordHash,
            role,
        });

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

        const data = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            role,
            active,
        };

        if (password) {
            data.password = await bcrypt.hash(
                password,
                10,
            );
        }

        const user =
            await User.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true,
                },
            ).select('-password');

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
                'Error al actualizar el usuario',
        });
    }
}

    async delete(req, res) {
        try {
            const id = req.params.id;

            const user = await User.findByIdAndDelete(id);

            if (!user) {
                return res.status(404).json({
                    message: 'Usuario no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: user,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al eliminar el usuario',
            });
        }
    }
    async uploadProfileImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: 'No se envió ningún archivo',
                });
            }

            const imagePath =
                `/uploads/profiles/${req.file.filename}`;

            const userId = req.user._id;

            const user = await User.findByIdAndUpdate(
                userId,
                {
                    profileImage: imagePath,
                },
                {
                    new: true,
                    runValidators: true,
                },
            ).select('-password');

            if (!user) {
                return res.status(404).json({
                    message: 'Usuario no encontrado',
                });
            }

            return res.status(200).json({
                message: 'Imagen de perfil actualizada',
                data: user,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: 'Error al actualizar la imagen de perfil',
            });
        }
    }
}

export default new UserController();
