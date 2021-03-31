import React from 'react';
import {useDispatch} from "react-redux";
import { roadbookDelete } from 'features/roadbook/roadbookSlice';
import {useHistory} from "react-router-dom";

export function RoadbookDeleteModal({ roadbookId }) {

    const dispatch = useDispatch()
    const history = useHistory();

    const handleSubmit = async () => {
        const token = sessionStorage.getItem('token')
        dispatch(roadbookDelete(roadbookId, token)); // requête pour supprimer le roadbook
        history.push('/dashboard');
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
                        <p>Attention, toute suppression est définitive !!!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={handleSubmit}>Supprimer le roadbook</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
