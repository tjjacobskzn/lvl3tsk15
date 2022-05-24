const Item = require("../models/items.models.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models.js")

exports.create = function (req, res) {
  // we verify the user.
  const token = req.headers["x-access-token"];
  const decoded = jwt.decode(token);
  // if the user is not verified we send an error.
  if (!decoded) {
    res.json({ error: "unauthorized request" });
    return;
  }

  // if the user is verified we create their item with an identifier (username) and send a status of "ok".
  const user = decoded.username;
  Item.create({
    toDoItem: req.body.toDoItem,
    username: user,
  });
  res.json({
    status: "ok",
  });
};

exports.findAll = async function (req, res) {
  // the token gets sent through headers.
  const token = req.headers["x-access-token"];
  // we decode the token to verify the user.
  const decoded = jwt.decode(token);

  if (!decoded) {
    // if the user is not verified we send an error.
    res.json({ error: "unauthorized request" });
    return;
  }
  // if the user is verified we find their data in the db.
  // user data in the db is stored with an identifier of the username.
  const username = decoded.username;
  const user = await User.findOne({
    username: username,
  });
 
  // this is admin access. an admin can view all todo items on the app.
  let items = [];
  if (user.isAdmin) {
    items = await Item.find();
  } else {
    items = await Item.find({
      username: username,
    });
  }
  res.json({ status: "ok", toDoItems: items });
};

exports.deleteItemsById = async function (req, res) {
  // we verify that it is indeed the user making the request.
  const token = req.headers["x-access-token"];
  const decoded = jwt.decode(token);
  // if the user is not verified we send an error.
  if (!decoded) {
    res.json({ error: "unauthorized request" });
    return;
  }

  // if the user is verified we remove the selected item from the db.
  await Item.deleteOne({ _id: req.params.id });

  res.json({ status: "ok" });
};
