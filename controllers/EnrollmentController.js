import Enrollment from '../models/enrollmentsModel.js';
import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

class EnrollmentController {
    async getAll(req, res) {
        try {
            const status = req.query.status;

            const filter = {};

            if (status) {
                filter.status = status;
            }

            const enrollments = await Enrollment.find(filter)
                .sort({ createdAt: -1 })
                .populate('course', 'name');

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

    async getMyEnrollments(req, res) {
        try {
            if (req.user.role !== 'student') {
                return res.status(403).json({
                    message: 'Esta consulta es solamente para estudiantes',
                });
            }

            const student = await User.findById(req.user._id);

            if (!student) {
                return res.status(404).json({
                    message: 'Estudiante no encontrado',
                });
            }

            const enrollments = await Enrollment.find({
                studentEmail: student.email,
            })
                .sort({
                    createdAt: -1,
                })
                .populate('course', 'name description duration modality price');

            return res.json({
                message: 'Success',
                data: enrollments,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: 'Error al obtener las inscripciones del estudiante',
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

            if (!course) {
                return res.status(400).json({
                    message: 'Debes seleccionar un curso',
                });
            }

            if (req.user.role !== 'admin' && req.user.role !== 'student') {
                return res.status(403).json({
                    message: 'No tienes permiso para crear inscripciones',
                });
            }

            const courseExists = await Course.findById(course);

            if (!courseExists) {
                return res.status(404).json({
                    message: 'Curso no encontrado',
                });
            }

            let enrollmentData = {
                studentName,
                studentEmail,
                course,
                status,
            };

            if (req.user.role === 'student') {
                const student = await User.findById(req.user._id);

                if (!student) {
                    return res.status(404).json({
                        message: 'Estudiante no encontrado',
                    });
                }

                enrollmentData = {
                    studentName: student.name,
                    studentEmail: student.email,
                    course,
                    status: 'pendiente',
                };
            }

            if (!enrollmentData.studentName || !enrollmentData.studentEmail) {
                return res.status(400).json({
                    message: 'Faltan los datos del estudiante',
                });
            }

            const existingEnrollment = await Enrollment.findOne({
                studentEmail: enrollmentData.studentEmail,
                course,
            });

            if (existingEnrollment) {
                return res.status(409).json({
                    message: 'El estudiante ya está inscrito en este curso',
                });
            }

            const enrollment = await Enrollment.create(enrollmentData);

            return res.status(201).json({
                message: 'Inscripción registrada correctamente',
                data: enrollment,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
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
