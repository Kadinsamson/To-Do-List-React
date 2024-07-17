import React, { useState } from 'react';
import './TodoList.css'; 
<body></body>

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setNewTask(tasks[index].text);
  };

  const updateTask = () => {
    if (currentTaskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex].text = newTask;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(-1);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={isEditing ? updateTask : addTask}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <div>
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => removeTask(index)}>Remove</button>
              <button onClick={() => toggleCompletion(index)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
