const express = require("express");
const router = express.Router();
const axios = require("axios");

// Ruta GET para obtener todos los usuarios desde JSONPlaceholder
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = response.data;
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

module.exports = router;
