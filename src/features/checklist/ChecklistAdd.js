import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addChecklist } from 'features/checklist/checklistSlice';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function ChecklistAdd() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch();

    const addTodo = () => {
        dispatch(addChecklist({ task: input, checked: false, id: Date.now()}))
        setInput('')
    }

    return (
        <div className="input-container">
            <input type="text" value={input} onChange={ e => setInput(e.target.value)} placeholder="..." />
            <button className="btn btn-motoo-blue" onClick={addTodo}><FontAwesomeIcon icon={faPlus}/></button>
        </div>
    );
}
