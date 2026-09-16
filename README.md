# API Quanti

API REST para gestionar cursos, profesores, inscripciones y usuarios de Academia Quanti.

## Datos del proyecto

- Nombre y Apellido:  Verónica Gallego  | Nairut Contreras
- Materia: Aplicaciones Híbridas
- Docente: Jonathan Emanuel Cruz
- Comisión: DWN4AV

## Descripción

Este proyecto consiste en una API REST para la administración de una academia. Permite gestionar usuarios, profesores, cursos e inscripciones utilizando Node.js, Express y MongoDB.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Bcrypt
- Chalk

## Endpoints principales

```txt
/api/users
/api/teachers
/api/courses
/api/enrollments
```

## Usuarios

```
GET     /api/users
GET     /api/users/:id
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id
```

## Profesores

```
GET     /api/teachers
GET     /api/teachers/:id
POST    /api/teachers
PUT     /api/teachers/:id
DELETE  /api/teachers/:id
```

## Cursos

```
GET     /api/courses
GET     /api/courses/:id
GET     /api/courses/:courseId/enrollments
POST    /api/courses
PUT     /api/courses/:id
DELETE  /api/courses/:id
```

## Filtros de cursos

```
GET     /api/courses?name=react
GET     /api/courses?modality=Virtual
GET     /api/courses?name=react&modality=Virtual
```

## Inscripciones

```
GET     /api/enrollments
GET     /api/enrollments/:id
POST    /api/enrollments
PUT     /api/enrollments/:id
DELETE  /api/enrollments/:id
```

## Filtros de inscripciones

```
GET     /api/enrollments?status=pendiente
GET     /api/enrollments?status=confirmada
GET     /api/enrollments?status=cancelada
GET     /api/courses/:courseId/enrollments?status=pendiente
```

## Relaciones

- Un curso tiene un profesor asociado.
- Una inscripción pertenece a un curso.
- No se puede eliminar un profesor si tiene cursos asociados.
- No se puede eliminar un curso si tiene inscripciones asociadas.

## Aclaración

Para crear un curso, primero debe existir un profesor.

Para crear una inscripción, primero debe existir un curso.

Las contraseñas de los usuarios se guardan encriptadas con bcrypt.