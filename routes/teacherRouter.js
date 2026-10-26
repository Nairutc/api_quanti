import express from 'express';
import teacherController from '../controllers/TeacherController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const controller = teacherController;
const router = express.Router();

// Rutas públicas
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Rutas exclusivas para administradores
router.post(
    '/',
    authMiddleware,
    roleMiddleware,
    controller.create,
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware,
    controller.update,
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware,
    controller.delete,
);

export default router;