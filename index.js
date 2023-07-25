const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

// Conexión a la base de datos
const dbConnect = require("./config/mongo");

// Importar las rutas desde la carpeta "routes"
const routes = require("./routes");

dbConnect().then(
  (res) => {
    // Usar las rutas en tu aplicación
    app.use("/", routes);

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log("Successfully connected");
      console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    });
  },
  (error) => {
    console.log("Connection error", error);
  }
);
