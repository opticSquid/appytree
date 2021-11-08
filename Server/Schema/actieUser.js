const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let activeUserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    r_token: {
      type: String,
      required: true,
      unique: true,
    },
    ip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActiveUser", activeUserSchema);
