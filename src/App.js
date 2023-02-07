import './App.css';

import React, { useEffect, useState } from "react";
import { useSound } from 'use-sound';
import { MdDone } from "react-icons/md";
import crossOutSound from './cross.mp3';
import addSound from './add.mp3';
import deleteSound from './delete.mp3';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [playAddSound] = useSound(addSound, { volume: 0.5 });
  const [playCrossOutSound] = useSound(crossOutSound, { volume: 0.5 });
  const [playDeleteSound] = useSound(deleteSound, { volume: 0.5 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { id: Date.now(), text: inputValue, isCompleted: false }]);
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleComplete = (id) => {
    playCrossOutSound()
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  useEffect(() => {
    const message = document.getElementById('congrats')
    if (tasks.length && tasks.every((task) => task.isCompleted === true)) {
      message.classList.remove("hidden")
    }
    else {
      if(!message.classList.contains("hidden")){
        message.classList.add("hidden")
      }
    }
  })

  const handleDelete = (id) => {
    playDeleteSound()
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <header className="flex flex-row justify-between p-2 bg-blue-200 mb-10">
        <p>INFM171</p>
        <p>Проект: Мултимедийни приложения в Интернет</p>
      </header>
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-3xl pb-10">Simple Todo List Application</h1>
        <form onSubmit={handleSubmit}>
          <input className="px-4 py-1 bg-gray-100 border rounded-md mr-4" type="text" value={inputValue} onChange={handleChange} />
          <button className="py-1 px-3 bg-blue-200 border rounded-md hover:bg-blue-300" type="submit" onClick={playAddSound}>Add</button>
        </form>
        <ul className="py-8 list-decimal">
          {tasks.map((task) => (
            <span><li key={task.id} className={task.isCompleted ? "completed task-item py-2" : "task-item py-2"} onClick={() => handleComplete(task.id)}>
              {task.text}
              <button id="delete-btn" className="delete-button ml-2 py-1 px-2 bg-red-200 border rounded-md hover:bg-red-300" onClick={(e) => { e.stopPropagation(); handleDelete(task.id) }}>Delete</button>
            </li></span>
          ))}
        </ul>
        <div id='congrats' className='task-item hidden'>
          <h1 className='spin-text text-2xl text-blue-800'>Congratulations!</h1>
          <p>You completed all tasks!</p>
        </div>
      </div>
    </div>
  );
};


export default App;
