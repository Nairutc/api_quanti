import teacherService from '../services/TeacherService.js';

class TeacherController {
    async getAll(req, res) {
        try {
            const teachers =
                await teacherService.getAll();

            res.json({
                message: 'Success',
                data: teachers,
            });
        } catch (err) {
            res.status(500).json({
                message:
                    'Error al obtener profesores',
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;

            const teacher =
                await teacherService.getById(id);

            if (!teacher) {
                return res.status(404).json({
                    message:
                        'Profesor no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: teacher,
            });
        } catch (err) {
            res.status(500).json({
                message:
                    'Error al obtener el profesor',
            });
        }
    }

    async create(req, res) {
        try {
            const {
                name,
                email,
                specialty,
            } = req.body;

            if (!name || !email || !specialty) {
                return res.status(400).json({
                    message: 'Faltan parámetros',
                });
            }

            const normalizedEmail =
                email.trim().toLowerCase();

            const user =
                await teacherService.getUserByEmail(
                    normalizedEmail,
                );

            const teacher =
                await teacherService.create({
                    user: user ? user._id : null,
                    name,
                    email: normalizedEmail,
                    specialty,
                });

            res.status(201).json({
                message: 'Success',
                data: teacher,
            });
        } catch (err) {
            console.error(err);

            res.status(500).json({
                message:
                    'Error al crear el profesor',
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const {
                name,
                email,
                specialty,
            } = req.body;

            if (!name || !email || !specialty) {
                return res.status(400).json({
                    message: 'Faltan parámetros',
                });
            }

            const normalizedEmail =
                email.trim().toLowerCase();

            const user =
                await teacherService.getUserByEmail(
                    normalizedEmail,
                );

            const teacher =
                await teacherService.update(id, {
                    user: user ? user._id : null,
                    name,
                    email: normalizedEmail,
                    specialty,
                });

            if (!teacher) {
                return res.status(404).json({
                    message:
                        'Profesor no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: teacher,
            });
        } catch (err) {
            res.status(500).json({
                message:
                    'Error al actualizar el profesor',
            });
        }
    }

    async getMyCourses(req, res) {
        try {
            if (req.user.role !== 'teacher') {
                return res.status(403).json({
                    message:
                        'Acceso exclusivo para profesores',
                });
            }

            let teacher =
                await teacherService.getByUserId(
                    req.user._id,
                );

            if (!teacher) {
                const user =
                    await teacherService.getUserById(
                        req.user._id,
                    );

                if (!user) {
                    return res.status(404).json({
                        message:
                            'Usuario no encontrado',
                    });
                }

                teacher =
                    await teacherService.getByEmail(
                        user.email,
                    );

                if (!teacher) {
                    return res.status(404).json({
                        message:
                            'No existe una ficha de profesor asociada a esta cuenta',
                    });
                }

                await teacherService.linkUser(
                    teacher,
                    user._id,
                );
            }

            const courses =
                await teacherService.getCourses(
                    teacher._id,
                );

            return res.json({
                message: 'Success',
                data: courses,
            });
        } catch (err) {
            console.error(err);

            return res.status(500).json({
                message:
                    'Error al obtener los cursos del profesor',
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const courses =
                await teacherService.getAssignedCourses(
                    id,
                );

            if (courses.length > 0) {
                return res.status(400).json({
                    message:
                        'No se puede eliminar el profesor porque tiene cursos asociados',
                });
            }

            const teacher =
                await teacherService.delete(id);

            if (!teacher) {
                return res.status(404).json({
                    message:
                        'Profesor no encontrado',
                });
            }

            res.json({
                message: 'Success',
                data: teacher,
            });
        } catch (err) {
            res.status(500).json({
                message:
                    'Error al eliminar el profesor',
            });
        }
    }
}

export default new TeacherController();