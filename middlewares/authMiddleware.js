import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token requerido',
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Formato de token inválido',
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log({ decoded });
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido',
        });
    }

    next();
};

export default authMiddleware;