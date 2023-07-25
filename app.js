const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

app.use(morgan("dev"));

app.use(cors()); //error de origen cruzado
app.use(express.json()); //Manejar data .json

app.name = "API";

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
// app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or `http://localhost:${FRONT}`// update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// app.use("/", require("./routes"));

app.get("/hello", (req, res) => {
  res.send("¡Hola! Esta es una prueba exitosa de Express en Vercel.");
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal.");
});

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
