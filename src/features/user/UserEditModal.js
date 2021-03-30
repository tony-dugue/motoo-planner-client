import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { userEdit, selectUser } from 'features/user/userSlice';

export function UserEditModal() {

    const dispatch = useDispatch()

    const { userProfile } = useSelector(selectUser); // on récupère le state

    const [formData, setFormData] = useState({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email });

    const { firstName, lastName, email } = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        const id = sessionStorage.getItem('id')
        const token = sessionStorage.getItem('token')
        const userData = { firstName, lastName, email };
        dispatch(userEdit(userData, id, token)); // requête pour modifier le profil du user
    }

    return (
        <div className="modal fade" id="editInfoProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} className="form-wrapper">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modifier les informations</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label>
                                <p>Votre prénom</p>
                                <input type="text" name="firstName" value={firstName} onChange={handleChange}
                                       placeholder="Votre prénom" required />
                            </label>

                            <label>
                                <p>Votre nom</p>
                                <input type="text" name="lastName" value={lastName} onChange={handleChange}
                                       placeholder="Votre nom" required />
                            </label>

                            <label>
                                <p>Votre email</p>
                                <input type="text" name="email" value={email} onChange={handleChange}
                                       placeholder="Votre email" required />
                            </label>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
