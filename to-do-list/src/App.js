import React, {useState} from "react";
import Todo from "./componentes/Todo"
import Form from "./componentes/Form";
import FilterButton from "./componentes/FilterButton";
import {nanoid} from "nanoid"

function App(props) {

  const [tasks, setTasks] = useState(props.tasks)

  const taskList = tasks.map((task)=> (
  <Todo 
  id={task.id} 
  name={task.name} 
  completed={task.completed} 
  key={task.id}
  toggleTaskCompleted = {toggleTaskCompleted}
  />
  ));

  function addTask(name){
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? 'tarefas' : 'tarefa';
  const headingText = `${taskList.length} ${tasksNoun} restantes`;

  function toggleTaskCompleted(id){
    console.log(tasks[0])
  }
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton/>
        <FilterButton/>
        <FilterButton/>
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
