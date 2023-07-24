const mongoose = require("mongoose");
const env = require("dotenv").config();

const DB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.gfac6fk.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conexión exitosa a MongoDB Atlas");
    console.log("Conectado a la BD: " + process.env.NAME_DB);
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas", error);
  }
};

module.exports = connectDB;
