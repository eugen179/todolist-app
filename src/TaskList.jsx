import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, editTask, deleteTask, toggleCompletion }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          editTask={editTask} 
          deleteTask={deleteTask} 
          toggleCompletion={toggleCompletion} 
        />
      ))}
    </ul>
  );
};

export default TaskList;
