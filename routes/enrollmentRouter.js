import express from 'express';
import enrollmentController from '../controllers/EnrollmentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const controller = enrollmentController;
const router = express.Router();

// Solamente administradores
router.get('/', authMiddleware, roleMiddleware, controller.getAll);

router.get('/my', authMiddleware, controller.getMyEnrollments);

router.get('/:id', authMiddleware, roleMiddleware, controller.getById);

// Cualquier usuario autenticado
router.post('/', authMiddleware, controller.create);

// Solamente administradores
router.put('/:id', authMiddleware, roleMiddleware, controller.update);

router.delete('/:id', authMiddleware, roleMiddleware, controller.delete);

export default router;
