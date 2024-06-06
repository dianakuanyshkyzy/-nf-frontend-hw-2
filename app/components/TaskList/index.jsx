import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({tasks, filter, onToggleTask, onDeleteTask}) => {
  const filteredtasks = tasks.filter(task=>{
    if(filter === 'active') return !task.completed; 
    if(filter === 'completed') return task.completed; 
    return true; 
  }); 
  return (
    <ul>
      {filteredtasks.map(task =>(
        <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggleTask}
        onDelete={onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
