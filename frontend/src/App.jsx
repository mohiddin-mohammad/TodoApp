import { useState,useEffect } from "react";
import link from "./sample";

import "./App.css";

function App() {
  const [task, setTask] = useState({
    todo: "",
    editing: false,
    isdone: false,
  });
  const [edittemp, setEditTemp] = useState({
    todo: "",
    editing: false,
    isdone: false,
  });
  const [alltasks, setAlltasks] = useState([{}]);
  useEffect(()=>{
    const getTasks = () => {
      fetch(`https://orange-potato-x5wv75qgwvwxfvx9w-8080.app.github.dev/todo/read`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((r) => setAlltasks(r));
    };
    getTasks();
  },[]);

  const handleChange = (event) => {
    setTask({ todo: event.target.value, editing: false, isdone: false });
  };

  const handleEdit = (event) => {
    setEditTemp({ todo: event.target.value });
  };
  //CREATE
  const addTask = () => {
    fetch(`${link}/todo/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => getTask());
  };

  //READ
  const getTask = () => {
    fetch(link+'/todo/read', {
      method: "GET",
    })
      .then((res) => res.json())
      .then((r) => setAlltasks(r));
    // .then((d) => setAlltasks(...alltasks, d));
  };

  //editing

  const editTask = (i) => {
    var aUpdated = [];
    for (let index = 0; index < alltasks.length; index++) {
      var element = alltasks[index];
      if (i == element.id) {
        element.editing = !element.editing;
      }
      aUpdated.push(element);
    }
    setAlltasks(aUpdated);
  };
  // UPDATE
  const updateTask = (i) => {
    fetch(`http://localhost:8080/todo/update/${i}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edittemp),
    }).then(() => getTask());
  };

  // DELETE
  const deleteTask = (i) => {
    fetch(`http://localhost:8080/todo/delete/${i}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => getTask());
  };

  //changing status
  const changeStatus = (i) => {
    var aUpdated = [];
    for (let index = 0; index < alltasks.length; index++) {
      var element = alltasks[index];
      if (i == element.id) {
        element.isdone = !element.isdone;
       setEditTemp({todo:element.todo,isdone:element.isdone,id:element.id,editing:element.editing });       }
      aUpdated.push(element);
    }
    setAlltasks(aUpdated);
    updateTask(i);
  };
  return (
    <>
      <div className="card">
        <h1>Todo App</h1>
        <input
          className="ip"
          onChange={handleChange}
          type="text"
          placeholder="Enter your task"
        />
        <button className="add-btn" onClick={addTask}>
          ➕
        </button>

        <div>
          {alltasks.map((x) => (
            <>
              <div
                style={{
                  border: x.isdone ? "1px solid #00E0C7" : "1px solid white",
                }}
                className="task-card"
              >
                <p
                  style={{
                    color: x.isdone ? "white" : "",
                    textDecoration: x.isdone ? "line-through" : "none",
                  }}
                  key={x.id}
                >
                  {x.todo}
                </p>
                <br />
                <div className="btn-div">
                  <button className="task-btn" onClick={() => editTask(x.id)}>
                    {/* <img src="./pencil.png" alt="" /> */}✏️
                  </button>
                  <button className="task-btn" onClick={() => deleteTask(x.id)}>
                    <img src="./trash-bin.png" alt="" />
                  </button>
                  <button
                    className="task-btn"
                    onClick={() => changeStatus(x.id)}
                  >
                    {/* <img src="./check.png" alt="" /> */}✔️
                  </button>
                </div>
                {x.editing && (
                  <>
                    <input type="text" onChange={handleEdit} />
                    <button
                      className="task-btn confirm "
                      onClick={() => updateTask(x.id)}
                    >
                      confirm
                    </button>
                  </>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
