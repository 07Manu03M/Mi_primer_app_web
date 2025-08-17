export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    msg: "Error interno del servidor",
    error: err.message
  });
};
