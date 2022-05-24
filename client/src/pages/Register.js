import React from "react";
import { useState } from "react";
import "./pages.css";

// this is the register page.
function Register() {
  // these state values are used to create a user.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    // we pass the username and password in the body of the post request to the backend so it can create the user in the db.
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    // if the creation was a success we redirect the user to the login page.
    if (data.status === "ok") {
      window.location.href = "/login";
    } else {
      // if the user creation was not successful (username exists) we alert the user "username unavailable"
      alert("username unavailable");
    }
  }

  return (
    <div className="register">
      <h1 className="registerTitle">Register</h1>
      <form onSubmit={registerUser}>
        <div>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          ></input>
        </div>
        <div>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          ></input>
        </div>

        <input className="registerBtn" value="Register" type="submit"></input>
      </form>
      <h3>
        Already a user ?{" "}
        <a className="redir" href="./Login">
          Log in
        </a>
      </h3>
      <a href="./">
        <h3>Home</h3>
      </a>
    </div>
  );
}

export default Register;
