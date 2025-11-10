const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://todo_user:Vansh24July@todoapp.5fjoeyg.mongodb.net/todoDB?retryWrites=true&w=majority&appName=TodoApp")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error(err));
  mongoose.connection.once("open", () => {
  console.log("🗃️  Connected to DB:", mongoose.connection.name);
});


// ✅ Define Todo Schema and Model
const todoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model("Todo", todoSchema);

// ✅ CRUD Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: false,
  });
  await todo.save();
  res.json(todo);
});


app.put("/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

app.get("/checkdb", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});


// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
