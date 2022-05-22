import jwt from "jsonwebtoken";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function User() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");

  async function toDoList() {
    axios
      .get("http://localhost:1337/api/todolist", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;

        if (data.status === "ok") {
          setList(data.toDoItems);
        } else {
          alert("failed");
        }
      });
  }

  async function addToDoItem(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:1337/api/todolist",
        {
          toDoItem: item,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          toDoList();
        } else {
          alert("failed");
        }
      });
  }

  async function deleteItem(id) {
    axios
      .delete(`http://localhost:1337/api/todolist/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          toDoList();
        } else {
          alert("failed");
        }
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        alert("Security breach detected. Account suspended for your safety.");
      } else {
        toDoList();
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div>
      <h1>To do list</h1>
      <button onClick={logout}>Logout</button>
      <div>
        <form onSubmit={addToDoItem}>
          <input
            type="string"
            onChange={(e) => setItem(e.target.value)}
          ></input>
          <input type="submit" value="Add responsibility"></input>
        </form>
      </div>
      <div>
        {list.map((item) => {
          return (
            <div key={item._id}>
              {item.toDoItem}
              <button onClick={() => deleteItem(item._id)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default User;
