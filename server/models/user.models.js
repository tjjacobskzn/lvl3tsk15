const mongoose = require("mongoose");
// User schema
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);
module.exports = model;
