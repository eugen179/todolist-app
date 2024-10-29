import React, { useState } from 'react';

const Task = ({ task, editTask, deleteTask, toggleCompletion }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, editText);
    setIsEditing(false);
  };

  return (
    <li className={`task ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={editText} 
            onChange={e => setEditText(e.target.value)} 
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span onClick={() => toggleCompletion(task.id)}>{task.text}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default Task;
