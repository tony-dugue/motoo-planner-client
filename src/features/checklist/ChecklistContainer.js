import React from 'react';
import {ChecklistItem} from "features/checklist/ChecklistItem";
import {ChecklistAdd} from "features/checklist/ChecklistAdd";
import {useSelector} from "react-redux";
import {selectChecklist} from 'features/roadbook/roadbookSlice';

export function ChecklistContainer() {

    const checklists = useSelector(selectChecklist)

    return (
        <div className="checklist__container">

            <div className="checklist__todo-container">
                {checklists.map(item => (
                    <ChecklistItem key={item.id} task={item.task} checked={item.checked} id={item.id}/>
                ))}
            </div>

            <ChecklistAdd/>

        </div>
    );
}
