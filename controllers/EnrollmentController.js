import Enrollment from '../models/enrollmentsModel.js';
import Course from '../models/courseModel.js';

class EnrollmentController {
    async getAll(req, res) {
        try {
            const status = req.query.status;

            const filter = {};

            if (status) {
                filter.status = status;
            }

            const enrollments = await Enrollment.find(filter).populate(
                'course',
                'name',
            );

            res.json({
                message: 'Success',
                data: enrollments,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al obtener inscripciones',
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;

            const enrollment = await Enrollment.findById(id).populate(
                'course',
                'name',
            );

            if (!enrollment) {
                return res.status(404).json({
                    message: 'Inscripción no encontrada',
                });
            }

            res.json({
                message: 'Success',
                data: enrollment,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al obtener la inscripción',
            });
        }
    }

    async create(req, res) {
        try {
            const { studentName, studentEmail, course, status } = req.body;

            if (!studentName || !studentEmail || !course) {
                return res.status(403).send('faltan parámetros');
            }

            const courseExists = await Course.findById(course);

            if (!courseExists) {
                return res.status(404).json({
                    message: 'Curso no encontrado',
                });
            }

            const enrollment = await Enrollment.create({
                studentName,
                studentEmail,
                course,
                status,
            });

            res.json({
                message: 'Success',
                data: enrollment,
            });
        } catch (err) {
            console.error(err);

            res.status(500).json({
                message: 'Error al crear la inscripción',
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const { studentName, studentEmail, course, status } = req.body;

            if (!studentName || !studentEmail || !course || !status) {
                return res.status(403).send('faltan parámetros');
            }

            const courseExists = await Course.findById(course);

            if (!courseExists) {
                return res.status(404).json({
                    message: 'Curso no encontrado',
                });
            }

            const enrollment = await Enrollment.findByIdAndUpdate(
                id,
                { studentName, studentEmail, course, status },
                { new: true, runValidators: true },
            );

            if (!enrollment) {
                return res.status(404).json({
                    message: 'Inscripción no encontrada',
                });
            }

            res.json({
                message: 'Success',
                data: enrollment,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al actualizar la inscripción',
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const enrollment = await Enrollment.findByIdAndDelete(id);

            if (!enrollment) {
                return res.status(404).json({
                    message: 'Inscripción no encontrada',
                });
            }

            res.json({
                message: 'Success',
                data: enrollment,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al eliminar la inscripción',
            });
        }
    }
}

export default new EnrollmentController();
