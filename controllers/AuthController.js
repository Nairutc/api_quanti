import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'Faltan parámetros obligatorios',
                });
            }

            const normalizedEmail = email.trim().toLowerCase();

            const exists = await User.findOne({
                email: normalizedEmail,
            });

            if (exists) {
                return res.status(409).json({
                    message: 'El usuario ya existe',
                    data: {},
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
            });

            return res.status(201).json({
                message: 'Usuario registrado correctamente',
                data: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: 'Error interno del servidor',
                error: error.message,
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Faltan parámetros obligatorios',
                });
            }

            const normalizedEmail = email.trim().toLowerCase();

            const user = await User.findOne({
                email: normalizedEmail,
            });

            if (!user) {
                return res.status(401).json({
                    message: 'Credenciales inválidas',
                });
            }

            if (!user.active) {
                return res.status(403).json({
                    message:
                        'La cuenta se encuentra inactiva',
                });
            }

            const isValid = await bcrypt.compare(
                password,
                user.password,
            );

            if (!isValid) {
                return res.status(401).json({
                    message: 'Credenciales inválidas',
                });
            }

            const payload = {
                _id: user._id,
                name: user.name,
                role: user.role,
            };

            const token = jwt.sign(payload, SECRET_KEY, {
                expiresIn: '1h',
            });

            return res.status(200).json({
                message: 'Credenciales correctas',
                token,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: 'Error interno del servidor',
                error: error.message,
            });
        }
    }
}

export default AuthController;