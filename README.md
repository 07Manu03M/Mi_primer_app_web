# 🚀 Proyecto Full Stack: Gestión de Tareas Colaborativas

[](https://nodejs.org/)
[](https://expressjs.com/)
[](https://www.mongodb.com/cloud/atlas)

Este proyecto es una aplicación **Full Stack** diseñada para la gestión de tareas colaborativas, ideal para equipos pequeños. Consiste en dos partes principales: un **backend** robusto (esta API) y un **frontend** interactivo para la gestión visual de las tareas.

-----

## 📋 Características Principales

  * **API REST**: Implementación de una API con operaciones completas para las tareas.
  * **Autenticación de Usuarios**: Sistema de registro y login seguro usando **JSON Web Tokens (JWT)**.
  * **Gestión de Tareas**: Los usuarios pueden crear y leer tareas.
  * **Estados de Tarea**: Las tareas pueden tener diferentes estados: `pendiente`, `en progreso`, y `completada`.
  * **Visualización**: El frontend permite visualizar un tablero de tareas.
  * **Código Modular**: El backend sigue buenas prácticas de arquitectura, con rutas, controladores y middlewares bien organizados.
  * **Validación de Datos**: Uso de `express-validator` para garantizar la integridad de los datos recibidos.

-----

## 🛠️ Tecnologías Utilizadas

  * **Backend**:
      * **Node.js**: Entorno de ejecución del servidor.
      * **Express**: Framework web para la API REST.
      * **MongoDB**: Base de datos NoSQL para el almacenamiento de datos.
      * **express-validator**: Middleware para la validación de peticiones.
      * **dotenv**: Para la gestión segura de variables de entorno.
      * **cors**: Para habilitar las peticiones desde el frontend.
      * **JWT**: Para la autenticación.
-----

## ⚙️ Requisitos y Configuración

Para ejecutar este proyecto, necesitas tener instalados **Node.js** (versión 14 o superior) y **MongoDB** (local).

Sigue estos pasos para la instalación del **backend**:

```bash
# 1. Clona el repositorio
git clone "https://github.com/07Manu03M/Mi_primer_app_web.git"

# 2. Navega al directorio del proyecto
cd gestion-tareas-backend

# 3. Instala las dependencias
npm install
```

### 🔑 Variables de Entorno (.env)

Crea un archivo llamado `.env` en la raíz del backend con la siguiente estructura. Es **crucial** no compartir este archivo en tu repositorio.

```ini
PORT=4000
MONGO_URI=mongodb://localhost:27017
DB_NAME=gestion_tareas
JWT_SECRET=supersecreto123
```

  * `PORT`: El puerto en el que se ejecutará el servidor.
  * `MONGODB_URI`: Tu cadena de conexión a la base de datos de MongoDB.
  * `JWT_SECRET`: Una cadena de texto secreta y única para la firma de los tokens.
  * `CORS_ORIGIN`: La URL de tu frontend para permitir peticiones (ajústala según tu entorno).

-----

## 🚀 Endpoints de la API

Todos los endpoints tienen la base `/api`. Si el backend se ejecuta en local, la URL completa es `http://localhost:4000/api`.

### **Autenticación**

  * **`POST /usuarios/login`**
      * **Descripción**: Inicia sesión y devuelve un token JWT para la autenticación en otras rutas.
      * **Cuerpo**:
        ```json
        {
          "email": "usuario@ejemplo.com",
          "password": "123456"
        }
        ```
      * **Respuesta**:
        ```json
        {
          "msg": "Login exitoso",
          "token": "jwt_token_generado",
          "usuarioId": "66be2d4f9e2fda..."
        }
        ```
  * **`POST /usuarios/registro`**
      * **Descripción**: Crea una nueva cuenta de usuario.
      * **Cuerpo**:
        ```json
        {
          "nombre": "Juan Perez",
          "email": "juan@correo.com",
          "password": "123456"
        }
        ```

### **Tareas**

  * **`POST /tareas`**
      * **Descripción**: Crea una nueva tarea. Requiere autenticación.
      * **Headers**: `Authorization: Bearer <token>`
      * **Cuerpo**:
        ```json
        {
          "titulo": "Configurar CORS",
          "descripcion": "Permitir conexión entre frontend y backend",
          "fechaLimite": "2025-08-20",
          "responsable": "Juan Perez"
        }
        ```
  * **`GET /tareas`**
      * **Descripción**: Obtiene todas las tareas. Requiere autenticación.
      * **Headers**: `Authorization: Bearer <token>`
  * **`PATCH /tareas/:id`**
      * **Descripción**: Actualiza el estado de una tarea por su ID. Requiere autenticación.
      * **Headers**: `Authorization: Bearer <token>`
      * **Cuerpo**:
        ```json
        {
          "estado": "en progreso"
        }

-----

## 🔗 Enlaces del Proyecto

  * **Repositorio del Frontend**:
    👉 [**Mi\_primer\_app\_web-frontend**](https://github.com/07Manu03M/Mi_primer_app_web-frontend)
  * **Video Explicativo**:
    🎥 [**Enlace al video explicativo del proyecto**](https://drive.google.com/drive/folders/1SHKMJ27ou9TPC_RzxuMBIT-NijVMIC4M?usp=sharing)