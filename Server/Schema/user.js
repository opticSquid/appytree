const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  r_token: {
    type: String,
    required: true,
    unique: true,
  }
});

module.exports = mongoose.model("User", userSchema);
