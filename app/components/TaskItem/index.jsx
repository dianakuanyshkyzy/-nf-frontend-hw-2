import React from 'react';
import Image from 'next/image';

const TaskItem = ({task, onToggle, onDelete}) => {
  return (
    <li key={task.id} className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2">
      <div className="flex items-center">
                <button
                  className="w-6 h-6 my-auto mr-6"
                  onClick={() => onToggle(task.id)}
                >
                  <Image
                    src={task.completed ? "/images/image1.png" : "/images/image.png"}
                    alt="Task status"
                    width={30}
                    height={30}
                  />
                </button>
                <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                  {task.text}
                </span>
              </div>
              <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
 
  );
};

export default TaskItem;
