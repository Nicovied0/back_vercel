const express = require("express");
const router = express.Router();
const { getPostInfo } = require("../controllers/index");

router.get("/", async (req, res) => {
  try {
    // Etiqueta iframe ingresada por el usuario
    const iframeCode =
      '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fbomberosvoluntarios.stacatalinaholmberg%2Fposts%2Fpfbid027RufzR9RXZp3UDBwmHHHa4VPL9NMYyQkDroqu9wieao1PXfuASERj1p7UxX1yCVul&show_text=true&width=500" width="500" height="250" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>';

    const postInfo = await getPostInfo(iframeCode);

    // Devolver el objeto como respuesta
    res.json(postInfo);
  } catch (error) {
    console.error("Error al cargar los datos", error);
    res.status(500).json({ error: "Error al cargar los datos" });
  }
});

module.exports = router;
