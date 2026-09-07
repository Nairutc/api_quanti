import Course from '../models/courseModel.js';
class CourseController {
    async getAll(req, res) {
        try {
            const courses = await Course.find();

            res.json({
                message: 'Success',
                data: courses
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al obtener cursos'
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const course = await Course.findById(id);

            if (!course) {
                return res.status(404).json({
                    message: 'Curso no encontrado'
                });
            }

            res.json({
                message: 'Success',
                data: course
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al obtener el curso'
            });
        }
    }

    async create(req, res) {
        try {
            const { name, description, duration, price } = req.body;

            if (!name || !description || !duration || price === undefined ) {
                return res.status(403).send("faltan parámetros");
            }

            const course = await Course.create({
                name,
                description,
                duration,
                price
            });

            res.json({
                message: 'Success',
                data: course
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Error al crear el curso'
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const { name, description, duration, modality, price } = req.body;

            if (!name || !description || !duration || !modality || price === undefined) {
                return res.status(403).send("faltan parámetros");
            }

            const course = await Course.findByIdAndUpdate(
                id,
                { name, description, duration, modality, price },
                { new: true }
            );

            if (!course) {
                return res.status(404).json({
                    message: 'Curso no encontrado'
                });
            }

            res.json({
                message: 'Success',
                data: course
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al actualizar el curso'
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const course = await Course.findByIdAndDelete(id);

            if (!course) {
                return res.status(404).json({
                    message: 'Curso no encontrado'
                });
            }

            res.json({
                message: 'Success',
                data: course
            });
        }
        catch (err) {
            res.status(500).json({
                message: 'Error al eliminar el curso'
            });
        }
    }
}

export default new CourseController();