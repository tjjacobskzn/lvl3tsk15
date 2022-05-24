import jwt from "jsonwebtoken";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./pages.css";

// this is the user's todo list page.
function User() {
  // we use hooks to use state.
  // all items will bes stored in the "list" array
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");

  // fetching the user's data.
  async function toDoList() {
    axios
      .get("http://localhost:1337/api/todolist", {
        // passing in the token to verify that it is the user requesting their data.
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;
        // if the response status is "ok" we push the user data into an array.
        if (data.status === "ok") {
          setList(data.toDoItems);
        } else {
          alert("failed");
        }
      });
  }

  // this function adds items to the user's db.
  async function addToDoItem() {
    axios
      .post(
        "http://localhost:1337/api/todolist",
        // we pass the newly created item to the backend to push it to the db.
        {
          toDoItem: item,
        },
        // passing in the token to verify that it is the user requesting their data.

        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          // if the response status was "ok" we fetch the data again.
          toDoList();
        } else {
          alert("failed");
        }
      });
  }

  async function deleteItem(id) {
    // we pass the id of the item as a parameter.
    // axios.delete removes an item with the id that matches.
    axios
      .delete(`http://localhost:1337/api/todolist/${id}`, {
        // passing in the token to verify that it is the user requesting their data.
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          // if the response status was "ok" we fetch the data again.
          toDoList();
        } else {
          alert("failed");
        }
      });
  }

  // we verify the user's jwt.
  useEffect(() => {
    const token = localStorage.getItem("token");
    // if the (hashed) user token exists in local storage we decode it to verify the username.
    if (token) {
      const user = jwt.decode(token);
      // if the user/token is false/tampered with we remove the token and log the user out. We notify the user that
      // there was a security breach and this can lead to proper customer feedback to improve our security/code.
      if (!user) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        alert("Security breach detected. Account suspended for your safety.");
      } else {
        // if nothing was tampered with we fetch the user's data.
        toDoList();
      }
    } else {
      // this returns the user to the "login" page
      window.location.href = "/login";
    }
  }, []);

  // this logs a user out by removing their jwt.
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="user">
      <div className="userHeadBtn">
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <h1 className="userHeadTitle">To do list</h1>
      </div>
      <div>
        <form onSubmit={addToDoItem}>
          <input
          required
            placeholder="wash dishes"
            type="string"
            onChange={(e) => setItem(e.target.value)}
          ></input>

          <input
            className="userFromBtn"
            type="submit"
            value="Add responsibility"
          ></input>
        </form>
      </div>
      <div className="userData">
        {list.map((item) => {
          return (
            <div className="userItem" key={item._id}>
              <h3>{item.toDoItem}</h3>{" "}
              <button
                className="userItemBtn"
                onClick={() => deleteItem(item._id)}
              >
                delete
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default User;
