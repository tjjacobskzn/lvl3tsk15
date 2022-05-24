// export module to make it modular.
module.exports = function (app) {
  // we get the Car controller to access it's CRUD functions.
  const user = require("../controllers/user.controller.js");
  // we get all items in the collection.
  app.post("/api/register", user.create);
};
