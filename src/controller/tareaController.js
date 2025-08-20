import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import Tarea from "../models/Tarea.js";
import Usuario from "../models/Usuario.js";

// Crear tarea
export const crearTarea = async (req, res, next) => {
  try {
    const { titulo, descripcion, fechaLimite, responsable } = req.body;
    const usuarioId = req.usuario.id;

    const db = getDB();

    const usuarioResponsable = await db
      .collection("usuarios")
      .findOne({ _id: new ObjectId(responsable) });

    if (!usuarioResponsable) {
      return res.status(404).json({ message: "Responsable no encontrado" });
    }

    // Instanciar usando el modelo Tarea
    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      fechaLimite,
      responsable: {
        id: usuarioResponsable._id,
        nombre: usuarioResponsable.nombre,
      },
      usuarioId
    });

    await db.collection("tareas").insertOne(nuevaTarea);

    res.status(201).json(nuevaTarea);
  } catch (error) {
    next(error);
  }
};



export const obtenerTareas = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    const db = getDB();

    const tareas = await db
      .collection("tareas")
      .find({ "responsable.id": new ObjectId(usuarioId) })
      .toArray();

    // Asegurar que todas tengan estado
    const tareasConEstado = tareas.map(t => ({
      ...t,
      estado: t.estado || "pendiente"
    }));

    res.json(tareasConEstado);
  } catch (err) {
    next(err);
  }
};


// Cambiar estado de una tarea
export const cambiarEstado = async (req, res, next) => {
  try {
    const { id } = req.params; // id de la tarea
    const { estado } = req.body;

    const estadosPermitidos = ["pendiente", "en progreso", "completada"];
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ msg: "Estado no válido" });
    }

    const db = getDB();
    const resultado = await db
      .collection("tareas")
      .updateOne({ _id: new ObjectId(id) }, { $set: { estado } });

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.json({ msg: "Estado actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};

// Eliminar tarea
export const eliminarTarea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const resultado = await db
      .collection("tareas")
      .deleteOne({ _id: new ObjectId(id) });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (err) {
    next(err);
  }
};

// Filtrar tareas por estado
export const filtrarTareas = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    const { estado } = req.query;

    const estadosPermitidos = ["pendiente", "en progreso", "completada"];
    if (estado && !estadosPermitidos.includes(estado)) {
      return res.status(400).json({ msg: "Estado no válido" });
    }

    const db = getDB();

    // Construir query dinámico
    const filtro = { "responsable.id": new ObjectId(usuarioId) };
    if (estado) filtro.estado = estado;

    const tareas = await db.collection("tareas").find(filtro).toArray();

    res.json(tareas);
  } catch (err) {
    next(err);
  }
};
