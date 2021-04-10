import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'
import {useDispatch} from 'react-redux';
import {setCheck, deleteChecklist, getLoading, getSuccess, getFailure} from 'features/roadbook/roadbookSlice';
import {checklistDelete} from 'api/checklistApi';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";

export function ChecklistItem({ task, checked, id }) {

    const dispatch = useDispatch();

    const handleCheck = () => dispatch(setCheck(id))

    const handleDelete = async () => {

        try {
            dispatch(getLoading())
            const registration = await checklistDelete(id);
            dispatch(deleteChecklist(id))
            dispatch(getSuccess())
            //if (!registration) dispatch(getFailure(registration.message))
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning("une erreur s'est produite ! Veuillez vérifier les champs")
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
