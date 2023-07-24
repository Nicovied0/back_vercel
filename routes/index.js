const express = require("express");
const router = express.Router();

const vehiclesRoutes = require("./vehicles");
// const authRoutes = require("./auth");
// const uploadDataRoutes = require("./uploadData");
// const uploadImageRoutes = require("./uploadFile");
// const usersRoutes = require("./users");
// const postRoutes = require("./post");
// const emailRoutes = require("./email");

router.use("/vehicles", vehiclesRoutes);
// router.use("/auth", authRoutes);
// router.use("/users", usersRoutes);
// router.use("/upload", uploadDataRoutes);
// router.use("/post", postRoutes);
// router.use("/uploadImage", uploadImageRoutes);
// router.use("/email", emailRoutes);
router.get("/vehicles", async (req, res) => {
  try {
    const todos = await Vehicles.find();
    console.log("Se llamó a la ruta /vehicles");
    res.json(todos);
  } catch (error) {
    console.error("Error al obtener los vehículos", error);
    res.status(500).json({ error: "Error al obtener los vehículos" });
  }
});
module.exports = router;
