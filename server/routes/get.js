// export module to make it modular.
module.exports = function (app) {
  // we get the Car controller to access it's CRUD functions.
  const item = require("../controllers/item.controller.js");
  // we get all items in the collection.
  app.get("/api/todolist", item.findAll);
};
