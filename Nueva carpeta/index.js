const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Configuración de CORS para permitir solicitudes desde "http://localhost:4200"
app.use(cors()); //error de origen cruzado
app.use(express.json()); //Manejar data .json


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

// Rutas
const routes = require("./routes/index");
app.use("/", routes);

// Conexión a la base de datos
const dbConnect = require("./db");

dbConnect().then(
  (res) => {

    app.listen(process.env.PORT, () => {
      console.log("Successfully connected");
      console.log(`http://localhost:${PORT}`);
    });
  },

  (error) => {
    console.log("Connection error", error);
  }
);
