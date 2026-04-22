import React, { useState } from 'react';

const ProjectForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    // 🛑 CRITICAL: This stops the page from refreshing!
    e.preventDefault(); 
    
    if (!title.trim() || !desc.trim()) {
      alert("Please enter both a title and description.");
      return;
    }

    onAdd(title, desc); // Sends data to App.jsx
    setTitle(''); // Clears the box
    setDesc('');  // Clears the box
  };

  return (
    <div className="form-card">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Project Name (e.g. FarmChainX)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="What does this project do?" 
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit" className="add-btn">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;