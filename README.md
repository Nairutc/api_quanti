# API Quanti

API REST para gestionar cursos, profesores, inscripciones y usuarios de Academia Quanti.

## Datos del proyecto

- Nombre y Apellido: Nairut Contreras | Verónica Gallego
- Materia: Aplicaciones Híbridas
- Docente: Jonathan Emanuel Cruz
- Comisión: DWN4AV

## Descripción

Este proyecto consiste en una API REST para la administración de una academia. Permite gestionar cursos, profesores, usuarios e inscripciones usando Node.js, Express y MongoDB.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Bcrypt
- Chalk

## Instalación

```bash
npm install
```

## Endpoints principales

```txt
/api/users
/api/courses
/api/teachers
/api/enrollments
```

## Usuarios

```txt
GET     /api/users
GET     /api/users/:id
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id
```

## Cursos

```txt
GET     /api/courses
GET     /api/courses/:id
POST    /api/courses
PUT     /api/courses/:id
DELETE  /api/courses/:id
```

## Filtros de cursos

```txt
GET     /api/courses?name=react
GET     /api/courses?modality=Virtual
GET     /api/courses?name=react&modality=Virtual
```

## Inscripciones de un curso

```txt
GET     /api/courses/:courseId/enrollments
GET     /api/courses/:courseId/enrollments?status=pendiente
```

## Profesores

```txt
GET     /api/teachers
GET     /api/teachers/:id
POST    /api/teachers
PUT     /api/teachers/:id
DELETE  /api/teachers/:id
```

## Inscripciones

```txt
GET     /api/enrollments
GET     /api/enrollments/:id
POST    /api/enrollments
PUT     /api/enrollments/:id
DELETE  /api/enrollments/:id
```

## Filtros de inscripciones

```txt
GET     /api/enrollments?status=pendiente
GET     /api/enrollments?status=confirmada
GET     /api/enrollments?status=cancelada
```

## Ejemplo profesor

```json
{
    "name": "Sofia Ramirez",
    "email": "sofia.ramirez@quanti.com",
    "specialty": "Maquetado y Desarrollo Web"
}
```

## Ejemplo curso

```json
{
    "name": "React Js",
    "description": "Curso inicial de React Js",
    "duration": "3 meses",
    "modality": "Presencial",
    "price": 95000,
    "teacher": "ID_DEL_PROFESOR"
}
```

## Ejemplo inscripción

```json
{
    "studentName": "Lucia Fernandez",
    "studentEmail": "lucia.fernandez@email.com",
    "course": "ID_DEL_CURSO",
    "status": "pendiente"
}
```

## Ejemplo usuario

```json
{
    "name": "Admin Quanti",
    "email": "admin@quanti.com",
    "password": "1234",
    "role": "admin"
}
```

## Variables de entorno

El proyecto utiliza variables de entorno para configurar el puerto y la conexión a MongoDB.

El archivo `.env` no se sube al repositorio porque está agregado en `.gitignore`.
Se incluye un archivo `.env_example` como referencia.

## Relaciones

- Un curso tiene un profesor asociado.
- Una inscripción pertenece a un curso.
- No se puede eliminar un profesor si tiene cursos asociados.
- No se puede eliminar un curso si tiene inscripciones asociadas.

## Aclaración

Para crear un curso, primero debe existir un profesor.
Para crear una inscripción, primero debe existir un curso.
Las contraseñas de los usuarios se guardan encriptadas con bcrypt.
