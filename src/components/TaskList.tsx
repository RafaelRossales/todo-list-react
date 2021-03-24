import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  var [tasks, setTasks] = useState<Task[]>([]);
  var [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    let id = Math.floor(Math.random() * 101);
    let title = newTaskTitle;
    let isComplete =  false;
    
    if(newTaskTitle === '') return

    const newTask :Task ={
      id,
      title,
      isComplete
    }

    tasks = tasks.concat(newTask);

    setTasks(tasks)
  }

  function handleToggleTaskCompletion(id: number) {
    
    var result = [];
    
    result = tasks.map((_task) =>{

      if(_task.id === id)
      {
        _task.isComplete = !_task.isComplete;
      }
      return _task;
  })

    setTasks(result);
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {

    const updatedTasks = tasks.filter(task => task.id !== id);

    setTasks(updatedTasks);

}

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}