import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
    async findUserByEmail(email) {
        return User.findOne({
            email,
        });
    }

    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    async comparePassword(
        password,
        hashedPassword,
    ) {
        return bcrypt.compare(
            password,
            hashedPassword,
        );
    }

    async createUser(userData) {
        return User.create(userData);
    }

    generateToken(user) {
        const payload = {
            _id: user._id,
            name: user.name,
            role: user.role,
        };

        return jwt.sign(
            payload,
            SECRET_KEY,
            {
                expiresIn: '1h',
            },
        );
    }
}

export default new AuthService();