const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const publicaciones = await Post.find();
    res.json(publicaciones);
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    res.status(500).json({ error: "Error al obtener las publicaciones" });
  }
});

// Ruta para obtener una publicación por su ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await Post.findById(id);
    if (!publicacion) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    res.json(publicacion);
  } catch (error) {
    console.error("Error al obtener la publicación:", error);
    res.status(500).json({ error: "Error al obtener la publicación" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { iframeLink } = req.body; // Obtiene el enlace del iframe desde el cuerpo de la solicitud

    // Función para modificar el ancho del iframe en la cadena
    function adjustIframeWidth(iframeLink, width) {
      return iframeLink.replace(/width="\d+"/, `width="${width}"`);
    }

    // Ajustar el ancho del iframe manteniendo el resto de la cadena sin cambios
    const adjustedIframeLink300 = adjustIframeWidth(iframeLink, 300);
    const adjustedIframeLink400 = adjustIframeWidth(iframeLink, 400);
    const adjustedIframeLink500 = adjustIframeWidth(iframeLink, 500);

    // Crear un nuevo objeto Post con los enlaces ajustados
    const nuevaPublicacion = new Post({
      iframeLink300: adjustedIframeLink300,
      iframeLink400: adjustedIframeLink400,
      iframeLink500: adjustedIframeLink500,
    });

    // Guardar en la base de datos
    await nuevaPublicacion.save();

    res.json({ mensaje: "Publicación guardada exitosamente" });
  } catch (error) {
    console.error("Error al guardar la publicación:", error);
    res.status(500).json({ error: "Error al guardar la publicación" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Encuentra y elimina la publicación por su ID
    await Post.findByIdAndRemove(id);

    res.json({ mensaje: "Publicación eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la publicación:", error);
    res.status(500).json({ error: "Error al eliminar la publicación" });
  }
});



module.exports = router;
