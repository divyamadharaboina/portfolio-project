const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data
let projects = [];

// Routes
app.get("/", (req, res) => {
  res.send("Backend Working ✅");
});

// 1. Get all projects
app.get("/projects", (req, res) => {
  res.json(projects);
});

// 2. Add new project (Fixed with ID and Category)
app.post("/projects", (req, res) => {
  const { title, description, category } = req.body;
  
  const newProject = {
    id: Date.now().toString(), // Creates a unique ID for deleting
    title,
    description,
    category: category || "General"
  };

  projects.push(newProject);
  res.json(newProject);
});

// 3. FEATURE: Delete Project
app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  
  // Filter out the project with the matching ID
  const initialLength = projects.length;
  projects = projects.filter((p) => p.id !== id);

  if (projects.length < initialLength) {
    res.status(200).json({ message: "Project deleted successfully" });
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});