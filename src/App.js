import React, { useState } from 'react';
import TaskList from './TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: isCompleted }]);
      setInputValue('');
      setIsCompleted(false);
    }
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => 
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedTasks = filteredTasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; 
  });

  return (
    <div className="app">
      <h1>To Do App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Add a new task..."
      />
      <label>
        <input 
          type="checkbox" 
          checked={isCompleted} 
          onChange={() => setIsCompleted(!isCompleted)} 
        />
        Mark as completed
      </label>
      <button onClick={addTask}>Add Task</button>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
      />
      
      <label>
        Filter tasks:
        <select onChange={e => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <h2>Active Tasks</h2>
      <TaskList 
        tasks={displayedTasks.filter(task => !task.completed)} 
        editTask={editTask} 
        deleteTask={deleteTask} 
        toggleCompletion={toggleCompletion} 
      />
      
      <h2>Completed Tasks</h2>
      <TaskList 
        tasks={displayedTasks.filter(task => task.completed)} 
        editTask={editTask} 
        deleteTask={deleteTask} 
        toggleCompletion={toggleCompletion} 
      />
    </div>
  );
};

export default App;
