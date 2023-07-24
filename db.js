const mongoose = require("mongoose");
const env = require("dotenv").config();

// const DB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.gfac6fk.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;

const connectDB = async () => {
  const DB_URI = `mongodb+srv://adminBBVV:TPryUkoJef4Rskbu@cluster0.gfac6fk.mongodb.net/app_bomberos?retryWrites=true&w=majority`;
  return mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

mongoose.set("strictQuery", false);

module.exports = connectDB;
