import { Router } from "express";
import { body } from "express-validator";
import {
  registrarUsuario,
  loginUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controller/usuarioController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

// Registro
router.post(
  "/registro",
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("Debe ser un email válido"),
    body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
  ],
  registrarUsuario
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Debe ser un email válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  ],
  loginUsuario
);

// Listar todos los usuarios (protegido con JWT)
router.get("/", auth, listarUsuarios);

// Obtener un usuario por ID
router.get("/:id", auth, obtenerUsuario);

// Actualizar usuario
router.put(
  "/:id",
  auth,
  [
    body("nombre").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
    body("email").optional().isEmail().withMessage("Debe ser un email válido"),
  ],
  actualizarUsuario
);

// Eliminar usuario
router.delete("/:id", auth, eliminarUsuario);

export default router;
