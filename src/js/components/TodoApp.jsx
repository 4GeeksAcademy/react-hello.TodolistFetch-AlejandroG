import React, { useEffect, useState } from "react";
import "../../styles/index.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const USERNAME = "Alejandro"; 

  
  const createUser = async () => {
    await fetch(`https://playground.4geeks.com/todo/users/Alejandro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
  };

  
  const getTasks = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`);
    const data = await response.json();
    setTasks(data.todos || []);
  };

  
  
  const addTask = async (text) => {
    if (text.trim() === "") return;
    const newTask = { label: text, is_done: false };
    await fetch(`https://playground.4geeks.com/todo/todos/${USERNAME}`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" }
    });
    setInput("");
    getTasks();
  };

  
  const deleteTask = async (id) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE"
    });
    getTasks();
  };

  const clearAllTasks = async () => {
    for (const task of tasks) {
      await fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
        method: "DELETE"
      });
    }
    getTasks();
  };

 
  useEffect(() => {
    createUser().then(getTasks);
  }, []);

  return (
    <div className="todo-container">
      <h1>todos</h1>
      <div className="todo-box">
        <input
          className="todo-input"
          type="text"
          placeholder="Agregar tarea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask(input)}
        />

        {tasks.length > 0 && (
          <button className="clear-all-btn" onClick={clearAllTasks}>
            Limpiar todas las tareas
          </button>
        )}

        <ul className="todo-list">
          {tasks.length === 0 ? (
            <li className="empty">No hay tareas</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="todo-item">
                {task.label}
                <span className="delete-btn" onClick={() => deleteTask(task.id)}>✕</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
