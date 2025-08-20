📌 Proyecto Full Stack - Gestión de Tareas Colaborativas

📖 Explicación del proyecto
Este proyecto consiste en una aplicación Full Stack sencilla para la gestión de tareas en equipos pequeños.

Incluye:
- Backend: API REST construida con Node.js (Express) y MongoDB.
- Frontend: Una interfaz que consume la API para gestionar tareas.

Los usuarios pueden:
- Registrar y autenticar cuentas.
- Crear tareas con `titulo`, `descripcion`, `fechaLimite` y `responsable`.
- Cambiar el estado de las tareas: `pendiente`, `en progreso`, `completada`.
- Visualizar un tablero de tareas filtrado por estado.

El backend implementa buenas prácticas:
- Modularización de rutas, controladores y middlewares.
- Uso de variables de entorno con dotenv.
- Validaciones con `express-validator`.
- JWT para autenticación de usuarios.
- Manejo de CORS para permitir la conexión con el frontend.

---

⚙️ Requerimientos de instalación

🔹 Backend
1. Clonar este repositorio:
   `git clone <URL-del-repositorio-backend>`
   `cd backend`
2. Instalar dependencias:
   `npm install`
3. Configurar las variables de entorno en un archivo `.env` (ver sección de abajo).
4. Ejecutar el servidor:
   `npm app.js`

---

🔑 Variables de entorno necesarias
Crear un archivo `.env` en la raíz del backend con las siguientes variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/gestion_tareas
JWT_SECRET=clave_secreta

---

🚀 Endpoints y ejemplos

### Todos los endpoint empezaran de esta forma (corriendo el backend en local): http://localhost:4000/api

🔹 Autenticación
Login:
`POST /usuarios/login`
`Content-Type: application/json`
`{ "email": "usuario@ejemplo.com", "password": "123456" }`
Respuesta:
`{ "msg": "Login exitoso", "token": "jwt_token_generado", "usuarioId": "66be2d4f9e2fda..." }`
Registro:
`POST /usuarios/registro`
`Content-Type: application/json`
`{ "nombre": "Juan Perez", "email": "juan@correo.com", "password": "123456" }`

🔹 Tareas
Crear tarea:
`POST /tareas`
`Headers: Authorization: Bearer <token>`
`Content-Type: application/json`
`{ "titulo": "Configurar CORS", "descripcion": "Permitir conexión entre frontend y backend", "fechaLimite": "2025-08-20", "responsable": "Juan Perez" }`
Obtener todas las tareas:
`GET /tareas`
`Headers: Authorization: Bearer <token>`
Actualizar estado de una tarea:
`PATCH /tareas/:id`
`Headers: Authorization: Bearer <token>`
`Content-Type: application/json`
`{ "estado": "en progreso" }`

---

🔗 Repositorio del frontend
👉 https://github.com/07Manu03M/Mi_primer_app_web-frontend

---

🎥 Video explicativo
