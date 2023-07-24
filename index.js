const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 3001;

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

app.get("/", (req, res) => {
  console.log("Estoy en: ", req.url);
  res.send(`soy ${req.url}`);
});

app.get("/home", (req, res) => {
  console.log("Estoy en: ", req.url);
  res.send("soy home");
});

const dbConnect = require("./db");


// app.listen(port, () => {
//   console.log(`Escuchando en puerto ${port}`);
// });

dbConnect().then(
  (res) => {

    app.listen(port, () => {
      console.log(`Escuchando en puerto ${port}`);
    });
  },

  (error) => {
    console.log("Connection error", error);
  }
);
