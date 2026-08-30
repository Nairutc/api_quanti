import fs from "fs/promises";

class Courses {
    constructor() {
    console.log("Hola desde el constructor de cursos");
    this.courses = [];
    this.path = "./data/courses.json";
    this.loadCourses();
    }
    addCourse(course) {
    if ( !course.name || !course.description || !course.duration || !course.modality || !course.price ) {
        console.error("Faltan parámetros para agregar el curso");
        return;
    }
    const id = crypto.randomUUID();
    course.id = id;
    this.courses.push(course);
    this.saveCourses();
    return course.id;
    }
    getCourses() {
    return this.courses;
    }
    getCourseById(id) {
    const course = this.courses.find((course) => course.id === id);
    return course;
    }
    updateCourse(id, course){
    const index = this.courses.findIndex((course) => course.id === id);
    if( index === -1 ) {
        console.error("Not found");
        return course;
    }
    if (course.name){
        this.courses[index].name = course.name;
    }
    if (course.description){
        this.courses[index].description = course.description;
    }
    if (course.duration){
        this.courses[index].duration = course.duration;
    }
    if (course.modality){
        this.courses[index].modality = course.modality;
    }
    if (course.price){
        this.courses[index].price = course.price;
    }
        this.saveCourses()
    }
    deleteCourseById(id) {
    const index = this.courses.findIndex((course) => course.id === id);
    if( index === -1 ) {
        console.error("No se encontró el curso con id: " + id);
        return 'Not Found';
    }
    this.courses.splice(index,1);
    this.saveCourses();
    return 'ok';
    }
    async saveCourses(){
        const data = JSON.stringify( this.courses, null, 2);
        await fs.writeFile(this.path, data , 'utf-8');
    }
    async loadCourses(){
        const data = await fs.readFile(this.path, { encoding:'utf-8' })
        this.courses = JSON.parse( data );
    }
}

export default Courses;