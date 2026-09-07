import Teacher from '../models/teacherModel.js';

class TeacherController {
    async getAll(req, res) {
        try {
            const teachers = await Teacher.find();

            res.json({
                message: 'Success',
                data: teachers
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al obtener profesores'
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;

            const teacher = await Teacher.findById(id);

            if (!teacher) {
                return res.status(404).json({
                    message: 'Profesor no encontrado'
                });
            }

            res.json({
                message: 'Success',
                data: teacher
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al obtener el profesor'
            });
        }
    }

    async create(req, res) {
        try {
            const { name, email, specialty } = req.body;

            if (!name || !email || !specialty) {
                return res.status(403).send('faltan parámetros');
            }

            const teacher = await Teacher.create({
                name,
                email,
                specialty
            });

            res.json({
                message: 'Success',
                data: teacher
            });
        }
        catch (err) {
            console.error(err);

            res.status(500).json({
                message: 'Error al crear el profesor'
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const { name, email, specialty } = req.body;

            if (!name || !email || !specialty) {
                return res.status(403).send('faltan parámetros');
            }

            const teacher = await Teacher.findByIdAndUpdate(
                id,
                { name, email, specialty },
                { new: true, runValidators: true }
            );

            if (!teacher) {
                return res.status(404).json({
                    message: 'Profesor no encontrado'
                });
            }

            res.json({
                message: 'Success',
                data: teacher
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al actualizar el profesor'
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const teacher = await Teacher.findByIdAndDelete(id);

            if (!teacher) {
                return res.status(404).json({
                    message: 'Profesor no encontrado'
                });
            }

            res.json({
                message: 'Success',
                data: teacher
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al eliminar el profesor'
            });
        }
    }
}

export default new TeacherController();