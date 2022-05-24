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
    isAdmin: {
      type: Boolean,
      required: false,
    },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);
module.exports = model;
