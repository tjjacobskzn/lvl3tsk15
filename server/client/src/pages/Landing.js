import React from "react";
import "./pages.css";
import img from "./img.jpg";

// this is the landing page.
export default function Landing() {
  // if the user wants to login this redirects them to the login page
  function login() {
    window.location.href = "/login";
  }
  // if the user wants to sign up this redirects them to the register page
  function sign() {
    window.location.href = "/register";
  }
  return (
    <div className="landing">
      <div className="landingHead">
        <h1 className="landingTitle">Welcome to My todo list</h1>
        <h2>
          My todo list is an app for everyone that wants to keep track of their
          daily responsibilities
        </h2>
        <div>
          <button onClick={login}>Login</button>
          <button className="landingSignbtn" onClick={sign}>
            Sign up
          </button>
        </div>
      </div>
      <div>
        {/* this is a preview of the app */}
        <img className="img" alt="preview" src={img} />
      </div>
    </div>
  );
}
