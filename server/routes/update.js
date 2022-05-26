// export module to make it modular.
module.exports = function (app) {
  // we get the Car controller to access it's CRUD functions.
  const item = require("../controllers/item.controller.js");
  // we use a parameter endpoint (id) to put/update an item.
  app.put("/api/todolist/:id", item.updateById);
};
