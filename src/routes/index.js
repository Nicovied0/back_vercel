const express = require("express");
const router = express.Router();

const vehiclesRoutes = require("./vehicles");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const uploadImageRoutes = require("./uploadFile");
const postRoutes = require("./post");
const emailRoutes = require("./email");
const user = require("./json");

router.use("/vehicles", vehiclesRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/post", postRoutes);
router.use("/uploadImage", uploadImageRoutes);
router.use("/email", emailRoutes);
router.use("/users2", user);

module.exports = router;
