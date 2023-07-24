const cors = require("cors");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();

const PORT = 3001;

// Conexión a la base de datos
const dbConnect = require("./config/mongo");

dbConnect().then(
  (res) => {
    app.listen(PORT, () => {
      console.log("Successfully connected");
      console.log(`http://localhost:${PORT}`);
    });
  },
  (error) => {
    console.log("Connection error", error);
  }
);
