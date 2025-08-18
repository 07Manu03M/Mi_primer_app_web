// models/Tarea.js
import { ObjectId } from "mongodb";

export default class Tarea {
  constructor({ titulo, descripcion, fechaLimite, responsable, usuarioId }) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fechaLimite = fechaLimite ? new Date(fechaLimite) : null;
    this.responsable = responsable; // puede ser el nombre del usuario o su ID
    this.estado = "pendiente"; // valor inicial
    this.usuarioId = new ObjectId(usuarioId); // referencia al dueño de la tarea
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  cambiarEstado(nuevoEstado) {
    const estadosValidos = ["pendiente", "en progreso", "completada"];
    if (!estadosValidos.includes(nuevoEstado)) {
      throw new Error("Estado no válido");
    }
    this.estado = nuevoEstado;
    this.fechaActualizacion = new Date();
  }

  actualizar({ titulo, descripcion, fechaLimite, responsable, estado }) {
    if (titulo !== undefined) this.titulo = titulo;
    if (descripcion !== undefined) this.descripcion = descripcion;
    if (fechaLimite !== undefined) this.fechaLimite = new Date(fechaLimite);
    if (responsable !== undefined) this.responsable = responsable;
    if (estado !== undefined) this.cambiarEstado(estado);
    this.fechaActualizacion = new Date();
  }
}
