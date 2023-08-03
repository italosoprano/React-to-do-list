import React, {useState, useRef, useEffect} from "react"

export default function Todo(props){

    function usePrevious (value) {
        const ref = useRef()
        useEffect(()=>{
            ref.current = value
        })
        return ref.current
    }

    const [isEditing, setEditing] = useState(false)
    const [newName, setNewName] = useState('')

    const editFieldRef = useRef(null)
    const editButtonRef = useRef(null)

    const wasEditing = usePrevious(isEditing)

    useEffect(()=>{
        if(!wasEditing && isEditing){
            editFieldRef.current.focus()
        }
        if(wasEditing && !isEditing) {
            editButtonRef.current.focus()
        }
    }, [wasEditing, isEditing])

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
                novo nome para {props.name}
            </label>
            <input 
            id={props.id} 
            className="todo-text" 
            type="text" 
            value={newName}
            handleChange = {handleChange}
            ref = {editFieldRef}
            />
            </div>
            <div className="btn-group">
            <button 
            type="button" 
            className="btn todo-cancel" 
            onClick={()=> setEditing(false)}>
                Cancelar
                <span className="visually-hidden">Renomear {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
                Salvar
                <span className="visually-hidden">novo nome para {props.name}</span>
            </button>
            </div>
        </form>
        );
        const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
            <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
                />
            <label className="todo-label" htmlFor={props.id}>
                {props.name}
            </label>
            </div>
            <div className="btn-group">
            <button type="button" 
            className="btn" 
            onClick={()=> setEditing(true)}
            ref={editButtonRef}
            >
                Editar <span className="visually-hidden">{props.name}</span>
            </button>
            <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id)}>
                Deletar <span className="visually-hidden">{props.name}</span>
            </button>
            </div>
        </div>
        );

        function handleChange(e){
            setNewName(e.target.value);
        }

        function handleSubmit(e){
            e.preventDefault();
            props.editTask(props.id, newName)
            setNewName('')
            setEditing(false)
        }

    return(
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}