import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addChecklist, getLoading, getFailure } from 'features/roadbook/roadbookSlice';
import {checklistCreate} from 'api/checklistApi';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";

export function ChecklistAdd() {

    const dispatch = useDispatch();
    const location = useLocation()

    const [input, setInput] = useState('')

    const addTodo = async () => {

        dispatch(getLoading())

        try {
            const urlPath = location.pathname.replace('roadbook', 'roadbooks')
            const checklistData = {task: input, checked: false, roadbook: 'api' + urlPath}

            const registration = await checklistCreate(checklistData);

            const newChecklist = {id: registration.id, task: registration.task, checked: registration.checked}
            await dispatch(addChecklist(newChecklist))
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning("une erreur s'est produite ! Veuillez vérifier les champs")
        }
    }

    return (
        <div className="input-container">
            <input type="text" value={input} onChange={ e => setInput(e.target.value)} placeholder="..." />
            <button className="btn btn-motoo-blue" onClick={addTodo}><FontAwesomeIcon icon={faPlus}/></button>
        </div>
    );
}
