import express from 'express';
import courseController from '../controllers/CourseController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const controller = courseController;
const router = express.Router();

// Rutas públicas
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Ruta solamente para administradores
router.get(
    '/:courseId/enrollments',
    authMiddleware,
    roleMiddleware,
    controller.getEnrollmentsByCourse,
);

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