const mongoose = require("mongoose");
// Item schema
const Item = new mongoose.Schema(
  {
    toDoItem: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { collection: "user-items" }
);

const model = mongoose.model("UserItems", Item);
module.exports = model;
