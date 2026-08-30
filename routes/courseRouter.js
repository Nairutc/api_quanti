import express from 'express';
import {
    getCourses,
    getCourseById,
    postCourse,
    updateCourse,
    deleteCourse
} from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getCourses);

router.get('/:id', getCourseById);

router.post('/', postCourse);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse);

export default router;