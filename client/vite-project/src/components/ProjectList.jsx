import React, { useState } from 'react';

const ProjectForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !desc) return;
    onAdd({ title, desc });
    setTitle('');
    desc('');
  };

  return (
    <div className="card form-container">
      <h3>Add Project</h3>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Description" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
        />
        <button type="submit" className="btn-add">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;