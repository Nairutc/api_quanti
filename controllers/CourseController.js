import courseService from '../services/CourseService.js';

class CourseController {
    async getAll(req, res) {
        try {
            const name = req.query.name;
            const modality = req.query.modality;

            const filter = {};

            if (name) {
                filter.name = {
                    $regex: name,
                    $options: 'i',
                };
            }

            if (modality) {
                filter.modality = {
                    $regex: modality,
                    $options: 'i',
                };
            }

            const courses =
                await courseService.getAll(filter);

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
            const status = req.query.status;

            const filter = {
                course: courseId,
            };

            if (status) {
                filter.status = status;
            }

            const enrollments =
                await courseService.getEnrollmentsByCourse(
                    filter,
                );

            res.json({
                message: 'Success',
                data: enrollments,
            });
        } catch (err) {
            res.status(500).json({
                message:
                    'Error al obtener las inscripciones del curso',
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;

            const course =
                await courseService.getById(id);

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
            const {
                name,
                description,
                duration,
                modality,
                price,
                teacher,
            } = req.body;

            if (
                !name ||
                !description ||
                !duration ||
                !modality ||
                price === undefined ||
                !teacher
            ) {
                return res.status(400).json({
                    message: 'Faltan parámetros',
                });
            }

            const teacherExists =
                await courseService.getTeacherById(
                    teacher,
                );

            if (!teacherExists) {
                return res.status(404).json({
                    message: 'Profesor no encontrado',
                });
            }

            const course =
                await courseService.create({
                    name,
                    description,
                    duration,
                    modality,
                    price,
                    teacher,
                });

            res.status(201).json({
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

            const {
                name,
                description,
                duration,
                modality,
                price,
                teacher,
            } = req.body;

            if (
                !name ||
                !description ||
                !duration ||
                !modality ||
                price === undefined ||
                !teacher
            ) {
                return res.status(400).json({
                    message: 'Faltan parámetros',
                });
            }

            const teacherExists =
                await courseService.getTeacherById(
                    teacher,
                );

            if (!teacherExists) {
                return res.status(404).json({
                    message: 'Profesor no encontrado',
                });
            }

            const course =
                await courseService.update(id, {
                    name,
                    description,
                    duration,
                    modality,
                    price,
                    teacher,
                });

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
                message:
                    'Error al actualizar el curso',
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const enrollments =
                await courseService.getCourseEnrollments(
                    id,
                );

            if (enrollments.length > 0) {
                return res.status(400).json({
                    message:
                        'No se puede eliminar el curso porque tiene inscripciones asociadas',
                });
            }

            const course =
                await courseService.delete(id);

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