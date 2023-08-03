import React, {useState, useRef, useEffect} from "react";
import Todo from "./componentes/Todo"
import Form from "./componentes/Form";
import FilterButton from "./componentes/FilterButton";
import {nanoid} from "nanoid"

function App(props) {

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')

  const listHeadingRef = useRef(null)

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed, 
    completed: (task) => task.completed,
  }

  const FILTER_NAMES = Object.keys(FILTER_MAP)

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name} 
    name={name}
    isPressed = {name === filter}
    setFilter = {setFilter}
    />
  ))

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task)=> (
  <Todo 
  id={task.id} 
  name={task.name} 
  completed={task.completed} 
  key={task.id}
  toggleTaskCompleted = {toggleTaskCompleted}
  deleteTasks = {deleteTasks}
  editTask = {editTask}
  />
  ));

  function addTask(name){
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? 'tarefas' : 'tarefa';
  const headingText = `${taskList.length} ${tasksNoun} restantes`;

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map((task)=>{
      //se essa task tem o mesmo ID da task editada
      if(id === task.id){
        //usaremos o spread para criar um novo objeto
        //que teve seu completed prop invertido
        return {...task, completed: !task.completed}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function deleteTasks(id){
    const remainingTasks = tasks.filter((tasks) => id !== tasks.id)
    setTasks(remainingTasks)
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map((task)=>{
      //se essa task tiver o mesmo id da task modificada.
      if(id === task.id){
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editedTaskList)
  }

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex='-1' ref={listHeadingRef}>{headingText}</h2>
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
