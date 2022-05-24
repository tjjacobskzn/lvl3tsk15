import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import User from "./pages/User.js";
import "./App.css";

const App = () => {
  return (
    // we use routes to change between pages.
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
