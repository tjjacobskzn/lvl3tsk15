const User = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SECRET = process.env.SECRET;

exports.create = async function (req, res) {
  try {
    // we create a new password by hashing the user's password with 10 digits (salt).
    const newPAssword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      // we build the user's "schema/model" that will be sent to the database.
      username: req.body.username,
      password: newPAssword,
      isAdmin: false,
    });
    // if successful we respond with status:"ok"
    res.json({ status: "ok" });
  } catch (err) {
    // If the process fails (username already taken) we respond with "username unavailable"
    res.json({ status: "username unavailable" });
  }
};

exports.login = async function (req, res) {
  // for login we search the database collection for the username
  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    // if the username is false we respond with "error" and "invalid login"
    return {
      status: "error",
      error: "invalid login",
    };
  }

  // if the username exists we check if the user inputted password matches with the username's password on the database.
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    // if the passwords match we sign the user in.
    const token = jwt.sign(
      {
        username: user.username,
      },
      SECRET
    );

    // if the sign in was successful we respond with status:"ok" and set the user token
    return res.json({ status: "ok", user: token });
  } else {
    // if sign in fails we respond with status:"error" and set the user to false.
    return res.json({ status: "error", user: false });
  }
};
