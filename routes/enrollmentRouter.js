import express from 'express';
import enrollmentController from '../controllers/enrollmentController.js';

const controller = enrollmentController;

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;