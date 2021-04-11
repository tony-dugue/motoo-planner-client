import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'
import {useDispatch} from 'react-redux';
import {setCheck, deleteChecklist, getLoading, getSuccess, getFailure} from 'features/roadbook/roadbookSlice';
import {checklistDelete, checklistCheck} from 'api/checklistApi';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export function ChecklistItem({ task, checked, id }) {

    const dispatch = useDispatch();

    const handleCheck = async () => {

        const checkedStatus = checked ? {checked: false} : {checked: true}

        try {
            dispatch(getLoading())
            dispatch(setCheck(id))
            dispatch(checklistCheck(id, checkedStatus))
            dispatch(getSuccess())
        } catch (error) {
            dispatch(getFailure(error))
        }
    }

    const handleDelete = async () => {
        try {
            dispatch(getLoading())
            await checklistDelete(id);
            dispatch(deleteChecklist(id))
            dispatch(getSuccess())
        } catch (error) {
            dispatch(getFailure(error))
        }
    }

    return (
        <div className="checklist-item">

            <span className="checklist-item--delete" onClick={handleDelete}><FontAwesomeIcon icon={faTimes}/></span>

            <Checkbox
                checked={checked}
                color="primary"
                onChange={handleCheck}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />

            <p className={checked ? 'checklist-item--done' : null}>{task}</p>

        </div>
    );
}
