import { Router } from "express";
import { body } from "express-validator";
import {
  crearTarea,
  obtenerTareas,
  cambiarEstado,
  eliminarTarea,
  filtrarTareas
} from "../controller/tareaController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

// Crear tarea (requiere JWT)
router.post(
  "/",
  auth,
  [
    body("titulo").notEmpty().withMessage("El título es obligatorio"),
    body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
    body("fechaLimite").isISO8601().withMessage("Debe ser una fecha válida"),
    body("responsable").notEmpty().withMessage("El responsable es obligatorio"),
  ],
  crearTarea
);

// Obtener todas las tareas del usuario autenticado
router.get("/:usuarioId", auth, obtenerTareas);

// Cambiar estado de la tarea (pendiente, en progreso, completada)
router.patch(
  "/:id/estado",
  auth,
  [
    body("estado")
      .isIn(["pendiente", "en progreso", "completada"])
      .withMessage("Estado no válido"),
  ],
  cambiarEstado
);

// Eliminar tarea
router.delete("/:id", auth, eliminarTarea);

router.get("/:usuarioId/filtrar", auth, filtrarTareas);

export default router;
