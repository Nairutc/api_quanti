import express from 'express';
import userController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const controller = userController;

const router = express.Router();


router.post(
    '/profile-image',
    authMiddleware,
    upload.single('profileImage'),
    controller.uploadProfileImage,
);

router.get(
    '/',
    authMiddleware,
    roleMiddleware,
    controller.getAll,
);

router.get(
    '/:id',
    authMiddleware,
    roleMiddleware,
    controller.getById,
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
