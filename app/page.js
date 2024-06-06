'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTaskText, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    }, []);
  
  useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);



  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask = { id: Date.now(), text: newTaskText.trim(), completed: false };
      setTasks([...tasks, newTask]);
      setNewTask(''); 
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const remainingTasks = tasks.filter(task => !task.completed).length;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newTaskText} // Bind input value to newTaskText state
          onChange={(e) => setNewTask(e.target.value)} // Update newTaskText state on input change
          onKeyPress={handleKeyPress} // Handle Enter key press
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <TaskList
          tasks={tasks}
          filter={filter}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{remainingTasks} item{remainingTasks !== 1 && 's'} left</span>
          <div>
            <button onClick={() => handleFilterChange('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => handleFilterChange('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => handleFilterChange('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={handleClearCompleted}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
