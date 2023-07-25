const mongoose = require("mongoose");

const dbConnect = () => {
  const DB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.gfac6fk.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;
  // const DB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ct1ukb2.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;
  
    // const DB_URI = `mongodb+srv://adminBBVV:TPryUkoJef4Rskbu@cluster0.gfac6fk.mongodb.net/app_bomberos?retryWrites=true&w=majority`;

  // const DB_URI = "mongodb://localhost:27017/MyDB";
  return mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

mongoose.set("strictQuery", false);

module.exports = dbConnect;
