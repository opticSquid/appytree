const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let activeUserSchema = new Schema(
  {
    UID: {
      type: String,
      required: true,
    },
    Ref_Tkn: {
      type: String,
      required: true,
      unique: true,
    },
    IP: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActiveUser", activeUserSchema);
