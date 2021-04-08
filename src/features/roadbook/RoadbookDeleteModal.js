import React from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {roadbookDelete} from 'api/roadbookApi';
import {getLoading, getFailure, getSuccess} from 'features/roadbook/roadbookSlice';

export function RoadbookDeleteModal({ roadbookId }) {

    const dispatch = useDispatch()
    const history = useHistory();

    const handleSubmit = async () => {

        dispatch(getLoading())

        try {
            await roadbookDelete(roadbookId)
            dispatch(getSuccess())
            toast.success('Roadbook supprimé')
            history.push('/dashboard');
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning("une erreur s'est produite !")
        }
    }

    return (
        <div className="modal fade" id="deleteRoadbook" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Supprimer le roadbook</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Attention, votre roadbook sera supprimé définitivement !!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-motoo-outline-blue" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal"
                                onClick={handleSubmit}>Supprimer le roadbook</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
