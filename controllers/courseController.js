import Courses from "../models/Courses.js";

const gestor = new Courses();

const getCourses = (req, res) => {
    const data = gestor.getCourses();
    res.json( { message: 'success', data: data});
};

const getCourseById = (req, res) => {
    const { id } = req.params;
    const course = gestor.getCourseById(id);
    if ( !course ){
        res.status(404).json({ message: 'Not Found', data:{} });
        return;
    }
    res.status(200).json( { message: "success" , data:course} );
};

const postCourse = (req, res) => {
    const body = req.body;
    const { name, description, duration, modality, price } = body;

    if (!name || !description || !duration || !modality || !price) {
        return res.status(403).send("faltan parámetros");
    }

    const id = gestor.addCourse({
        name,
        description,
        duration,
        modality,
        price
    });

    res.send(`<h1>Curso registrado correctamente con el id ${id} </h1>`);
};

const updateCourse = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    gestor.updateCourse(id, body);

    res.status(200).json( { message: "success" , data: {} } );
};

const deleteCourse = (req, res) => {
    const { id } = req.params;
    console.log( {id} );
    const status = gestor.deleteCourseById(id);
    if ( status == 'Not Found' ){
        res.status(404).json({ message: 'Not Found', data:{} });
        return;
    }
    res.status(200).json( { message: "success" , data: {} } );
};

export { getCourses, getCourseById, postCourse, updateCourse, deleteCourse };