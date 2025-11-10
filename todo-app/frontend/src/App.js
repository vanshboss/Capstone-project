import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // ✅ Fetch Todos
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // ✅ Add Todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setNewTodo("");
  };

  // ✅ Delete Todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  // ✅ Toggle Complete
  const toggleComplete = async (todo) => {
    const res = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t._id === todo._id ? updated : t)));
  };

  // ✅ Start Edit
  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditValue(todo.title);
  };

  // ✅ Save Edit
  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editValue }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t._id === id ? updated : t)));
    setEditId(null);
  };

  return (
    <div className="todo-container">
      <h1>📝 My Todo List</h1>

      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            {editId === todo._id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(todo._id)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(todo)}>
                  {todo.title}
                </span>
                <div className="btn-group">
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
