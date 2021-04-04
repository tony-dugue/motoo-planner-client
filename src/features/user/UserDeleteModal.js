import React from 'react';
import {useDispatch} from "react-redux";
import { userDelete } from 'features/user/userSlice';
import {useHistory} from "react-router-dom";

export function UserDeleteModal() {

    const dispatch = useDispatch()
    const history = useHistory();


    const handleSubmit = async () => {
        const id = sessionStorage.getItem('id')
        const token = sessionStorage.getItem('token')
        dispatch(userDelete(id, token)); // requête pour modifier le profil du user
        history.push('/');
    }

    return (
        <div className="modal fade" id="deleteProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Supprimer le compte</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Attention, toute suppression est définitive !!</p>
                        <p>(Votre compte sera supprimé ainsi que vos roadbooks)</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-motoo-outline-blue" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal"
                                onClick={handleSubmit}>Supprimer le compte</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
