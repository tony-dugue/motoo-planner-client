import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'
import {useDispatch} from 'react-redux';
import {setCheck, deleteChecklist} from 'features/checklist/checklistSlice';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export function ChecklistItem({ task, checked, id }) {
    const dispatch = useDispatch();

    const handleCheck = () => dispatch(setCheck(id))
    const handleDelete = () => dispatch(deleteChecklist(id))


    return (
        <div className="checklist-item">

            <span className="checklist-item--delete" onClick={handleDelete}><FontAwesomeIcon icon={faTimes}/></span>

            <Checkbox
                checked={checked}
                color="primary"
                onChange={handleCheck}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />

            <p className={checked ? 'checklist-item--done' : null}>- {task}</p>

        </div>
    );
}
