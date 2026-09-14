import Course from '../models/courseModel.js';
import Enrollment from '../models/enrollmentsModel.js';
import Teacher from '../models/teacherModel.js';
class CourseController {
    async getAll(req, res) {
        try {
            const name = req.query.name;
            const modality = req.query.modality;

            const filter = {};

            if (name) {
                //use $regex y $options: 'i' para hacer la búsqueda insensible a mayúsculas y minúsculas y buscar coincidencias.
                filter.name = { $regex: name, $options: 'i' };
            }

            if (modality) {
                filter.modality = { $regex: modality, $options: 'i' };
            }

            const courses = await Course.find(filter).populate(
                'teacher',
                'name specialty',
            );

            res.json({
                message: 'Success',
                data: courses,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al obtener cursos',
            });
        }
    }

    async getEnrollmentsByCourse(req, res) {
        try {
            const courseId = req.params.courseId;
            const query = req.query.status;

            console.log({ query });

            const filter = { course: courseId };

            if (query) {
                filter.status = query;
            }

            const enrollments = await Enrollment.find(filter)
                .sort({ createdAt: 1 })
                .populate('course');

            res.json({
                message: 'Success',
                data: enrollments,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al obtener las inscripciones del curso',
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const course = await Course.findById(id).populate(
                'teacher',
                'name specialty',
            );

            if (!course) {
                return res.status(404).json({
                    message: 'Curso no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: course,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al obtener el curso',
            });
        }
    }

    async create(req, res) {
        try {
            const { name, description, duration, modality, price, teacher } =
                req.body;

            if (
                !name ||
                !description ||
                !duration ||
                !modality ||
                price === undefined ||
                !teacher
            ) {
                return res.status(403).send('faltan parámetros');
            }

            const teacherExists = await Teacher.findById(teacher);

            if (!teacherExists) {
                return res.status(404).json({
                    message: 'Profesor no encontrado',
                });
            }

            const course = await Course.create({
                name,
                description,
                duration,
                modality,
                price,
                teacher,
            });

            res.json({
                message: 'Success',
                data: course,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Error al crear el curso',
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const { name, description, duration, modality, price, teacher } =
                req.body;

            if (
                !name ||
                !description ||
                !duration ||
                !modality ||
                price === undefined ||
                !teacher
            ) {
                return res.status(403).send('faltan parámetros');
            }

            const teacherExists = await Teacher.findById(teacher);

            if (!teacherExists) {
                return res.status(404).json({
                    message: 'Profesor no encontrado',
                });
            }

            const course = await Course.findByIdAndUpdate(
                id,
                { name, description, duration, modality, price, teacher },
                { new: true, runValidators: true },
            );

            if (!course) {
                return res.status(404).json({
                    message: 'Curso no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: course,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al actualizar el curso',
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const enrollments = await Enrollment.find({ course: id });

            if (enrollments.length > 0) {
                return res.status(400).json({
                    message:
                        'No se puede eliminar el curso porque tiene inscripciones asociadas',
                });
            }

            const course = await Course.findByIdAndDelete(id);

            if (!course) {
                return res.status(404).json({
                    message: 'Curso no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: course,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error al eliminar el curso',
            });
        }
    }
}

export default new CourseController();
