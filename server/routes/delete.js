// export module to make it modular.
module.exports = function (app) {
  // we get the Car controller to access it's CRUD functions.
  const item = require("../controllers/item.controller.js");
  // we use a parameter endpoint (id) to remove an item.
  app.delete("/api/todolist/:id", item.deleteItemsById);
};
