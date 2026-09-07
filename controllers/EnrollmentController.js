import Enrollment from '../models/enrollmentsModel.js';

class EnrollmentController {
    async getAll(req, res) {
        try {
            const enrollments = await Enrollment.find();

            res.json({
                message: 'Success',
                data: enrollments
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al obtener inscripciones'
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;

            const enrollment = await Enrollment.findById(id);

            if (!enrollment) {
                return res.status(404).json({
                    message: 'Inscripción no encontrada'
                });
            }

            res.json({
                message: 'Success',
                data: enrollment
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al obtener la inscripción'
            });
        }
    }

    async create(req, res) {
        try {
            const { studentName, studentEmail, courseName, status } = req.body;

            if (!studentName || !studentEmail || !courseName) {
                return res.status(403).send('faltan parámetros');
            }

            const enrollment = await Enrollment.create({
                studentName,
                studentEmail,
                courseName,
                status
            });

            res.json({
                message: 'Success',
                data: enrollment
            });
        }
        catch (err) {
            console.error(err);

            res.status(500).json({
                message: 'Error al crear la inscripción'
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const { studentName, studentEmail, courseName, status } = req.body;

            if (!studentName || !studentEmail || !courseName || !status) {
                return res.status(403).send('faltan parámetros');
            }

            const enrollment = await Enrollment.findByIdAndUpdate(
                id,
                { studentName, studentEmail, courseName, status },
                { new: true, runValidators: true }
            );

            if (!enrollment) {
                return res.status(404).json({
                    message: 'Inscripción no encontrada'
                });
            }

            res.json({
                message: 'Success',
                data: enrollment
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al actualizar la inscripción'
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const enrollment = await Enrollment.findByIdAndDelete(id);

            if (!enrollment) {
                return res.status(404).json({
                    message: 'Inscripción no encontrada'
                });
            }

            res.json({
                message: 'Success',
                data: enrollment
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al eliminar la inscripción'
            });
        }
    }
}

export default new EnrollmentController();