require("dotenv").config();
const PORT = process.env.PORT || 1337;
const app = require("./app");
// we listen in another file for testing purposes.

// our server runs on port 1337 or whatever port number is in the .env file.
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
