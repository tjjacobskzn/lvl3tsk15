const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();
const dbPassword = process.env.KEY;
const dbUser = process.env.USER;
const CLUSTER = process.env.CLUSTER;
const COLLECTION = process.env.COLLECTION;

// Connecting to our database with secure usernames, passwords and clusters by storing them as environment variables.
mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@${CLUSTER}.emze8.mongodb.net/${COLLECTION}?retryWrites=true&w=majority`
);

// we require our roots to make authentication and CRUD possible.
require("./routes/new.js")(app);
require("./routes/get.js")(app);
require("./routes/delete.js")(app);
require("./routes/makeUser.js")(app);
require("./routes/userLogin.js")(app);

// our server runs on port 1337 or whatever port number is in the .env file.
app.listen(1337, () => {
  console.log(`server running on port ${1337}`);
});

// FOR REVIEW PURPOSES ONLY
// below code is the standard way of express coding.
// as seen above, our code runs modular because we use routes models and controllers.
// below code is for review and study/learning purpose as it build the basic understanding of jwt authentication
// and express fetching (non modular code).

// -----------------------------------------------------------------------------------------------------------------------------------

// const SECRET = process.env.SECRET;

// const User = require("./models/user.models");
// const Item = require("./models/items.models");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// ----------------------------------------------------------------------
// REGISTER LOGIN AUTHENTICATION LOGOUT -JWT

// app.post("/api/register", async (req, res) => {
//   try {
//     // we create a new password by hashing the user's password with 10 digits (salt).
//     const newPAssword = await bcrypt.hash(req.body.password, 10);
//     await User.create({
//       // we build the user's "schema/model" that will be sent to the database.
//       username: req.body.username,
//       password: newPAssword,
//     });
//     // if successful we respond with status:"ok"
//     res.json({ status: "ok" });
//   } catch (err) {
//     // If the process fails (username already taken) we respond with "username unavailable"
//     res.json({ status: "username unavailable" });
//   }
// });

// app.post("/api/login", async (req, res) => {
//   // for login we search the database collection for the username
//   const user = await User.findOne({
//     username: req.body.username,
//   });

//   if (!user) {
//     // if the username is false we respond with "error" and "invalid login"
//     return {
//       status: "error",
//       error: "invalid login",
//     };
//   }

//   // if the username exists we check if the user inputted password matches with the username's password on the database.
//   const isPasswordValid = await bcrypt.compare(
//     req.body.password,
//     user.password
//   );

//   if (isPasswordValid) {
//     // if the passwords match we sign the user in.
//     const token = jwt.sign(
//       {
//         username: user.username,
//       },
//       SECRET
//     );

//     // if the sign in was successful we respond with status:"ok" and set the user token
//     return res.json({ status: "ok", user: token });
//   } else {
//     // if sign in fails we respond with status:"error" and set the user to false.
//     return res.json({ status: "error", user: false });
//   }
// });
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// USER INTERACTION

// // this gets user data
// app.get("/api/todolist", async (req, res) => {
//   // the token gets sent through headers.
//   const token = req.headers["x-access-token"];
//   // we decode the token to verify the user.
//   const decoded = jwt.decode(token);

//   if (!decoded) {
//     // if the user is not verified we send an error.
//     res.json({ error: "unauthorized request" });
//     return;
//   }
//   // if the user is verified we find their data in the db.
//   // user data in the db is stored with an identifier of the username.
//   const user = decoded.username;

//   const items = await Item.find({
//     username: user,
//   });
//   res.json({ status: "ok", toDoItems: items });
// });

// // this deletes an item.
// // we pass the item's id through as a parameter.
// app.delete("/api/todolist/:id", async (req, res) => {
//   // we verify that it is indeed the user making the request.
//   const token = req.headers["x-access-token"];
//   const decoded = jwt.decode(token);
//   // if the user is not verified we send an error.
//   if (!decoded) {
//     res.json({ error: "unauthorized request" });
//     return;
//   }

//   // if the user is verified we remove the selected item from the db.
//   await Item.remove({ _id: req.params.id });

//   res.json({ status: "ok" });
// });

// // this creates an item.
// app.post("/api/todolist", (req, res) => {
//   // we verify the user.
//   const token = req.headers["x-access-token"];
//   const decoded = jwt.decode(token);
//   // if the user is not verified we send an error.
//   if (!decoded) {
//     res.json({ error: "unauthorized request" });
//     return;
//   }

//   // if the user is verified we create their item with an identifier (username) and send a status of "ok".
//   const user = decoded.username;
//   Item.create({
//     toDoItem: req.body.toDoItem,
//     username: user,
//   });
//   res.json({
//     status: "ok",
//   });
// });
// -----------------------------------------------------------------------------------
