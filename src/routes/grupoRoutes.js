import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  crearGrupo,
  listarGrupos,
  obtenerGrupo,
  editarGrupo,
  eliminarGrupo,
  invitarAlGrupo,
  salirDelGrupo
} from "../controller/grupoController.js";

const router = express.Router();

// Crear un grupo (autenticado)
router.post("/", auth, crearGrupo);

// Listar todos los grupos (autenticado)
router.get("/", auth, listarGrupos);

// Obtener un grupo por ID
router.get("/:id", auth, obtenerGrupo);

// Editar un grupo (solo administradores)
router.put("/:id", auth, editarGrupo);

// Eliminar un grupo (solo el creador)
router.delete("/:id", auth, eliminarGrupo);

// Invitar usuario al grupo (solo administradores)
router.post("/:id/invitar", auth, invitarAlGrupo);

// Salir del grupo (cualquier miembro excepto el creador)
router.post("/:id/salir", auth, salirDelGrupo);

export default router;
