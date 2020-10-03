const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayPicture: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);
module.exports = mongoose.model("users", userSchema);
