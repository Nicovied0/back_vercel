const express = require("express");

const app = express();
const port = 3001;

app.use(function (req, res, next) {
  console.log("Soy el middleware");
  next();
});

app.get("/", (req, res) => {
  console.log("Estoy en: ", req.url);
  res.send(`soy ${req.url}`);
});

app.get("/home", (req, res) => {
  console.log("Estoy en: ", req.url);
  res.send("soy home");
});

app.listen(port, () => {
  console.log(`Escuchando en puerto ${port}`);
});