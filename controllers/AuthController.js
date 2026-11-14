import authService from '../services/AuthService.js';

class AuthController {
    async register(req, res) {
        try {
            const {
                name,
                email,
                password,
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
                await authService.findUserByEmail(
                    normalizedEmail,
                );

            if (exists) {
                return res.status(409).json({
                    message:
                        'Ya existe un usuario con ese correo',
                });
            }

            const passwordHash =
                await authService.hashPassword(
                    password,
                );

            const user =
                await authService.createUser({
                    name: name.trim(),
                    email: normalizedEmail,
                    password: passwordHash,
                });

            return res.status(201).json({
                message:
                    'Usuario registrado correctamente',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    active: user.active,
                    createdAt: user.createdAt,
                },
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message:
                    'Error interno del servidor',
            });
        }
    }

    async login(req, res) {
        try {
            const {
                email,
                password,
            } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message:
                        'Faltan parámetros obligatorios',
                });
            }

            const normalizedEmail =
                email.trim().toLowerCase();

            const user =
                await authService.findUserByEmail(
                    normalizedEmail,
                );

            if (!user) {
                return res.status(401).json({
                    message:
                        'Credenciales inválidas',
                });
            }

            if (!user.active) {
                return res.status(403).json({
                    message:
                        'La cuenta se encuentra inactiva',
                });
            }

            const isValid =
                await authService.comparePassword(
                    password,
                    user.password,
                );

            if (!isValid) {
                return res.status(401).json({
                    message:
                        'Credenciales inválidas',
                });
            }

            const token =
                authService.generateToken(user);

            return res.status(200).json({
                message:
                    'Credenciales correctas',
                token,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message:
                    'Error interno del servidor',
            });
        }
    }
}

export default AuthController;