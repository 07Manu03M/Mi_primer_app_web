import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./src/config/db.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);

// Manejo de errores global
app.use(errorHandler);

// Conexión a DB y arranque
const PORT = process.env.PORT || 4000;

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
