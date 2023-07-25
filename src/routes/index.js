const express = require("express");
const router = express.Router();

const vehiclesRoutes = require("./vehicles");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
// const postRoutes = require("./post");
// const uploadImageRoutes = require("./uploadFile");
// const emailRoutes = require("./email");

router.use("/vehicles", vehiclesRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
// router.use("/post", postRoutes);
// router.use("/uploadImage", uploadImageRoutes);
// router.use("/email", emailRoutes);

module.exports = router;
