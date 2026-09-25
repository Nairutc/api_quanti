import express from 'express';
import courseController from '../controllers/CourseController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const controller = courseController;

const router = express.Router();

router.get('/', authMiddleware, controller.getAll);
router.get('/:courseId/enrollments', authMiddleware, controller.getEnrollmentsByCourse);
router.get('/:id', authMiddleware, controller.getById);
router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

export default router;
