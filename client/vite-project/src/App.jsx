import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Dev"); // FEATURE 1: Category
  const [searchTerm, setSearchTerm] = useState("");     // FEATURE 2: Search

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("Server offline");
    }
  };

  const addProject = async () => {
    if (!title || !description) return alert("Fill all fields");
    try {
      const res = await axios.post("http://localhost:5000/projects", {
        title,
        description,
        category
      });
      setProjects([res.data, ...projects]);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert("Error adding project");
    }
  };

  // FEATURE 3: Delete Functionality
  const deleteProject = async (id) => {
    if (window.confirm("Delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/projects/${id}`);
        setProjects(projects.filter((p) => p.id !== id));
      } catch (err) {
        alert("Delete failed on server. (Make sure your backend has a DELETE route)");
      }
    }
  };

  // Search Filtering Logic
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="portfolio-container">
      <header className="header">
        <h1 className="gradient-text">Internship Dashboard</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search projects..."
            className="search-bar"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid-layout">
        {/* Creation Form */}
        <aside className="form-card">
          <h2>New Project</h2>
          <input
            className="modern-input"
            value={title}
            placeholder="Project Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="modern-input"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <select 
            className="modern-input" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Web Dev">Web Dev</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Mobile App">Mobile App</option>
          </select>
          <button className="add-btn" onClick={addProject}>Create Project</button>
        </aside>

        {/* List Section */}
        <section className="list-section">
          {filteredProjects.map((p) => (
            <div key={p.id} className="project-card">
              <div className="card-header">
                <span className="category-tag">{p.category || "General"}</span>
                <button className="delete-btn" onClick={() => deleteProject(p.id)}>🗑️</button>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;