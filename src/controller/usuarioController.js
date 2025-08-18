import { getDB } from "../config/db.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import { ObjectId } from "mongodb";

// -------------------- REGISTRO --------------------
export const registrarUsuario = async (req, res, next) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { nombre, email, password } = req.body;
    const db = getDB();

    const existe = await db.collection("usuarios").findOne({ email });
    if (existe) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    const usuario = new Usuario({ nombre, email, password });
    await usuario.hashPassword();

    await db.collection("usuarios").insertOne(usuario);

    res.status(201).json({ msg: "Usuario creado exitosamente" });
  } catch (err) {
    next(err);
  }
};

// -------------------- LOGIN --------------------
export const loginUsuario = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const db = getDB();

    const usuario = await db.collection("usuarios").findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "Credenciales incorrectas" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ msg: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login exitoso", token });
  } catch (err) {
    next(err);
  }
};

// -------------------- LISTAR USUARIOS --------------------
export const listarUsuarios = async (req, res, next) => {
  try {
    const db = getDB();
    const usuarios = await db.collection("usuarios").find().toArray();
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

// -------------------- OBTENER USUARIO POR ID --------------------
export const obtenerUsuario = async (req, res, next) => {
  try {
    const db = getDB();
    const usuario = await db.collection("usuarios").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

// -------------------- ACTUALIZAR USUARIO --------------------
export const actualizarUsuario = async (req, res, next) => {
  try {
    const { nombre, email } = req.body;
    const db = getDB();

    const resultado = await db.collection("usuarios").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { nombre, email } }
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({ msg: "Usuario actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};

// -------------------- ELIMINAR USUARIO --------------------
export const eliminarUsuario = async (req, res, next) => {
  try {
    const db = getDB();

    const resultado = await db.collection("usuarios").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
