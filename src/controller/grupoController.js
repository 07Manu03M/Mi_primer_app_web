import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import Grupo from "../models/Grupo.js";

// Crear grupo
export const crearGrupo = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const creadoPor = req.usuario.id; // viene del middleware auth

    const db = getDB();

    const nuevoGrupo = {
      nombre,
      descripcion,
      administradores: [new ObjectId(creadoPor)],
      participantes: [],
      creadoPor: new ObjectId(creadoPor),
      creadoEn: new Date(),
    };

    const resultado = await db.collection("grupos").insertOne(nuevoGrupo);

    res.status(201).json({
      ...nuevoGrupo,
      _id: resultado.insertedId,
    });
  } catch (err) {
    next(err);
  }
};

// Listar grupos
// Listar grupos donde el usuario pertenece
export const listarGrupos = async (req, res, next) => {
  try {
    const usuarioId = new ObjectId(req.usuario.id);
    const db = getDB();

    const grupos = await db.collection("grupos").find({
      $or: [
        { administradores: usuarioId },
        { participantes: usuarioId }
      ]
    }).toArray();

    res.json(grupos);
  } catch (err) {
    next(err);
  }
};

// Salir del grupo (no puede el creador)
export const salirDelGrupo = async (req, res, next) => {
  try {
    const { id } = req.params; // id del grupo
    const usuarioId = new ObjectId(req.usuario.id);
    const db = getDB();

    const grupo = await db.collection("grupos").findOne({ _id: new ObjectId(id) });
    if (!grupo) return res.status(404).json({ msg: "Grupo no encontrado" });

    // Verificar si el usuario pertenece
    const esAdmin = grupo.administradores.some(admin => admin.equals(usuarioId));
    const esParticipante = grupo.participantes.some(part => part.equals(usuarioId));

    if (!esAdmin && !esParticipante) {
      return res.status(403).json({ msg: "No perteneces a este grupo" });
    }

    // Verificar si es el creador
    if (grupo.creadoPor.equals(usuarioId)) {
      return res.status(403).json({ msg: "El creador no puede salir del grupo" });
    }

    // Sacar al usuario del grupo
    await db.collection("grupos").updateOne(
      { _id: new ObjectId(id) },
      {
        $pull: {
          administradores: usuarioId,
          participantes: usuarioId
        }
      }
    );

    const grupoActualizado = await db.collection("grupos").findOne({ _id: new ObjectId(id) });

    res.json({ msg: "Has salido del grupo", grupo: grupoActualizado });
  } catch (err) {
    next(err);
  }
};


// Obtener un grupo por ID
export const obtenerGrupo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const grupo = await db
      .collection("grupos")
      .findOne({ _id: new ObjectId(id) });

    if (!grupo) return res.status(404).json({ msg: "Grupo no encontrado" });

    res.json(grupo);
  } catch (err) {
    next(err);
  }
};

// Editar grupo (solo admin)
export const editarGrupo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const usuarioId = new ObjectId(req.usuario.id);

    const db = getDB();
    const grupo = await db.collection("grupos").findOne({ _id: new ObjectId(id) });

    if (!grupo) return res.status(404).json({ msg: "Grupo no encontrado" });

    if (!grupo.administradores.some(admin => admin.equals(usuarioId))) {
      return res.status(403).json({ msg: "No autorizado" });
    }

    await db.collection("grupos").updateOne(
      { _id: new ObjectId(id) },
      { $set: { nombre, descripcion } }
    );

    const grupoActualizado = await db
      .collection("grupos")
      .findOne({ _id: new ObjectId(id) });

    res.json(grupoActualizado);
  } catch (err) {
    next(err);
  }
};

// Eliminar grupo (solo el creador)
export const eliminarGrupo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarioId = new ObjectId(req.usuario.id);

    const db = getDB();
    const grupo = await db.collection("grupos").findOne({ _id: new ObjectId(id) });

    if (!grupo) return res.status(404).json({ msg: "Grupo no encontrado" });

    if (!grupo.creadoPor.equals(usuarioId)) {
      return res.status(403).json({ msg: "Solo el creador puede eliminar el grupo" });
    }

    await db.collection("grupos").deleteOne({ _id: new ObjectId(id) });

    res.json({ msg: "Grupo eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};

// Invitar usuario al grupo (solo admin)
export const invitarAlGrupo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { usuarioId } = req.body;
    const adminId = new ObjectId(req.usuario.id);

    const db = getDB();
    const grupo = await db.collection("grupos").findOne({ _id: new ObjectId(id) });

    if (!grupo) return res.status(404).json({ msg: "Grupo no encontrado" });

    if (!grupo.administradores.some(admin => admin.equals(adminId))) {
      return res.status(403).json({ msg: "No autorizado" });
    }

    await db.collection("grupos").updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: { participantes: new ObjectId(usuarioId) } } // $addToSet evita duplicados
    );

    const grupoActualizado = await db
      .collection("grupos")
      .findOne({ _id: new ObjectId(id) });

    res.json({ msg: "Usuario invitado", grupo: grupoActualizado });
  } catch (err) {
    next(err);
  }
};
