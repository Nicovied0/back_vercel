const axios = require("axios");
const { JSDOM } = require("jsdom");

async function getPostInfo(iframeCode) {
  // Extraer el valor del atributo src de la etiqueta iframe
  const srcRegex = /src="(.*?)"/;
  const match = iframeCode.match(srcRegex);
  const iframeUrl = match ? match[1] : null;

  if (iframeUrl) {
    try {
      const response = await axios.get(iframeUrl);
      const html = response.data;
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Obtener el texto de los elementos <p>
      const textElements = document.querySelectorAll("p");
      const text = Array.from(textElements)
        .map((element) => element.textContent)
        .join(" ");

      // Obtener todas las imágenes
      const imageElements = document.querySelectorAll("img");

      // Eliminar las primeras dos imágenes
      const images = Array.from(imageElements)
        .slice(2) // Remover las dos primeras imágenes
        .map((element) => element.src);

      // Crear el objeto con la información obtenida
      const postInfo = {
        text,
        images,
      };

      // Devolver el objeto con la información
      return postInfo;
    } catch (error) {
      console.error(
        "Error al obtener la información de la publicación:",
        error
      );
      throw error;
    }
  } else {
    throw new Error(
      "No se encontró un atributo src válido en la etiqueta iframe ingresada."
    );
  }
}

module.exports = { getPostInfo };
