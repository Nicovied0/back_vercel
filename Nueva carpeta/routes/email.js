const express = require("express");
const router = express.Router();
const enviarCorreo = require("../controllers/email");

router.post("/", (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  enviarCorreo(nombre, email, asunto, mensaje);

  // Agregar aquí la lógica adicional que desees realizar después de enviar el correo

  res.status(200).json({ mensaje: "Correo enviado correctamente" });
});

module.exports = router;
