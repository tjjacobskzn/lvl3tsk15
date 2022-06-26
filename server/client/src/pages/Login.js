import React from "react";
import { useState } from "react";
import "./pages.css";

// this is the login page
function Login() {
  // these state values are used to pass and verify a user.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    // we pass the username and password through the post request body to verify it in the backend.
    const response = await fetch("/api/login", {
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
    // if the user is true we grant them a token (jwt) and redirect them to their todo list.
    if (data.user) {
      localStorage.setItem("token", data.user);
      window.location.href = "/user";
    } else {
      // if the login fails (wrong username or password) we alert the user "invalid credentials".
      alert("invalid credentials");
    }
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Login</h1>
      <form onSubmit={loginUser}>
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

        <input className="loginBtn" value="Login" type="submit"></input>
      </form>
      <h3>
        Not a user ?{" "}
        <a className="redir" href="./Register">
          Register
        </a>
      </h3>
      <a href="./">
        <h3>Home</h3>
      </a>
    </div>
  );
}

export default Login;
