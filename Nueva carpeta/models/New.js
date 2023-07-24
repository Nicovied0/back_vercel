const mongoose = require("mongoose");

const NewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    default: "https://i.imgur.com/7kNllwK.png",
  },
  text: {
    type: String,
    required: true,
  },
  actve: {
    type: Boolean,
    default: true,
  },
});

const New = mongoose.model("New", NewSchema);

module.exports = New;
