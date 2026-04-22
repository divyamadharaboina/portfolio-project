import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Dev");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch projects (with fallback)
  useEffect(() => {
    axios.get("http://localhost:5000/projects")
      .then(res => setProjects(res.data))
      .catch(() => {
        // fallback if backend not working
        setProjects([
          {
            id: 1,
            title: "Portfolio Website",
            description: "Full stack project",
            category: "Web Dev"
          },
          {
            id: 2,
            title: "Blockchain App",
            description: "Smart contract project",
            category: "Blockchain"
          }
        ]);
      });
  }, []);

  // ✅ Add project
  const addProject = async () => {
    if (!title || !description) {
      return alert("Fill all fields");
    }

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
      alert("Server offline → adding locally");

      // fallback add (frontend only)
      const newProject = {
        id: Date.now(),
        title,
        description,
        category
      };

      setProjects([newProject, ...projects]);
      setTitle("");
      setDescription("");
    }
  };

  // ✅ Delete project
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(`http://localhost:5000/projects/${id}`);
    } catch (err) {
      alert("Server delete failed → removing locally");
    }

    setProjects(projects.filter((p) => (p._id || p.id) !== id));
  };

  // ✅ Search filter
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="portfolio-container">
      <header className="header">
        <h1 className="gradient-text">Internship Dashboard</h1>

        <input
          type="text"
          placeholder="🔍 Search projects..."
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="grid-layout">

        {/* FORM */}
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

          <button className="add-btn" onClick={addProject}>
            Create Project
          </button>
        </aside>

        {/* LIST */}
        <section className="list-section">
          {filteredProjects.length === 0 ? (
            <p>No projects found</p>
          ) : (
            filteredProjects.map((p) => (
              <div key={p._id || p.id} className="project-card">
                <div className="card-header">
                  <span className="category-tag">
                    {p.category || "General"}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProject(p._id || p.id)}
                  >
                    🗑️
                  </button>
                </div>

                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))
          )}
        </section>

      </div>
    </div>
  );
}

export default App;