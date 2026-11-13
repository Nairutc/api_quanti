# API Quanti

API REST desarrollada para gestionar la información de la Academia Quanti.

El sistema permite administrar usuarios, profesores, cursos e inscripciones utilizando Node.js, Express y MongoDB.

## Integrantes

- Nairut Contreras
- Verónica Gallego

## Datos académicos

- Materia: Aplicaciones Híbridas
- Docente: Jonathan Emanuel Cruz
- Comisión: DWN4AV
- Año: 2026

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Contraseñas encriptadas con bcrypt.
- Autorización según el rol del usuario.
- CRUD de usuarios.
- CRUD de profesores.
- CRUD de cursos.
- CRUD de inscripciones.
- Búsqueda de cursos por nombre.
- Filtrado de cursos por modalidad.
- Filtrado de inscripciones por estado.
- Actualización del perfil.
- Carga de foto de perfil.
- Validación de datos.
- Relaciones entre las colecciones.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- Bcrypt
- Multer
- Dotenv
- CORS

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- MongoDB local o una conexión a MongoDB Atlas

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Nairutc/api_quanti.git
```

Ingresar a la carpeta:

```bash
cd api_quanti
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/api_quanti
SECRET_KEY=clave_secreta
```

## Ejecutar el proyecto

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

También se puede iniciar mediante:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3000
```

La página principal de la API puede visitarse desde esa dirección.

## Estructura principal

```text
config/          Conexión con MongoDB
controllers/     Lógica de las solicitudes
middlewares/     Autenticación, roles y carga de imágenes
models/          Esquemas de Mongoose
public/          Página informativa de la API
routes/          Rutas y endpoints
index.js         Archivo principal del servidor
```

## Autenticación

### Registrar un usuario

```http
POST /api/auth/register
```

### Iniciar sesión

```http
POST /api/auth/login
```

Cuando las credenciales son correctas, la API devuelve un token JWT.

Las rutas privadas esperan el token mediante el encabezado:

```http
Authorization: Bearer TOKEN
```

## Usuarios

```http
GET     /api/users
GET     /api/users/:id
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id
```

## Perfil del usuario

```http
GET   /api/users/profile
PUT   /api/users/profile
POST  /api/users/profile-image
```

La carga de la imagen utiliza `form-data` con el campo:

```text
profileImage
```

Formatos permitidos:

- JPEG
- PNG
- WebP

Tamaño máximo:

```text
2 MB
```

## Profesores

```http
GET     /api/teachers
GET     /api/teachers/:id
POST    /api/teachers
PUT     /api/teachers/:id
DELETE  /api/teachers/:id
```

## Cursos

```http
GET     /api/courses
GET     /api/courses/:id
GET     /api/courses/:courseId/enrollments
POST    /api/courses
PUT     /api/courses/:id
DELETE  /api/courses/:id
```

## Filtros de cursos

Buscar cursos por nombre:

```http
GET /api/courses?name=react
```

Filtrar cursos por modalidad:

```http
GET /api/courses?modality=Virtual
```

Combinar los filtros:

```http
GET /api/courses?name=react&modality=Virtual
```

## Inscripciones

```http
GET     /api/enrollments
GET     /api/enrollments/:id
POST    /api/enrollments
PUT     /api/enrollments/:id
DELETE  /api/enrollments/:id
```

## Filtros de inscripciones

```http
GET /api/enrollments?status=pendiente
GET /api/enrollments?status=confirmada
GET /api/enrollments?status=cancelada
```

También se pueden consultar las inscripciones pertenecientes a un curso:

```http
GET /api/courses/:courseId/enrollments
```

## Relaciones

- Un curso tiene un profesor asociado.
- Una inscripción pertenece a un curso.
- No se puede eliminar un profesor que tenga cursos asociados.
- No se puede eliminar un curso que tenga inscripciones asociadas.
- Para crear un curso debe existir previamente un profesor.
- Para crear una inscripción debe existir previamente un curso.

## Permisos

- Los cursos y profesores pueden consultarse públicamente.
- Los administradores pueden gestionar usuarios.
- Los administradores pueden crear, editar y eliminar profesores.
- Los administradores pueden crear, editar y eliminar cursos.
- Los administradores pueden consultar, editar y eliminar inscripciones.
- Los usuarios autenticados pueden crear inscripciones.
- Cada usuario autenticado puede consultar y actualizar su perfil.

## Frontend

El frontend de Quanti está disponible en:

https://github.com/Nairutc/frontend_quanti