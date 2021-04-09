import React from 'react';
import {ChecklistItem} from "features/checklist/ChecklistItem";
import {ChecklistAdd} from "features/checklist/ChecklistAdd";
import {useSelector} from "react-redux";
import {selectChecklistTodo} from 'features/checklist/checklistSlice';

export function ChecklistContainer() {

    const checklistTodo = useSelector(selectChecklistTodo)

    return (
        <div className="checklist__container">

            <div className="checklist__todo-container">
                {checklistTodo.map(item => (
                    <ChecklistItem key={item.id} task={item.task} checked={item.checked} id={item.id}/>
                ))}
            </div>

            <ChecklistAdd/>

        </div>
    );
}
