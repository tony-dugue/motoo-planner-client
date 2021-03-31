import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { userEdit, selectUser } from 'features/user/userSlice';
import {toast} from "react-toastify";

const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function UserEditModal() {

    const dispatch = useDispatch()

    const { userProfile } = useSelector(selectUser); // on récupère le state

    const [formData, setFormData] = useState({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        avatar: userProfile.avatar
    });

    const { firstName, lastName, email, avatar } = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        if(!emailValidator.test(email)) {
            toast.warning("Votre email n'est pas au bon format")
        } else {
            const id = sessionStorage.getItem('id')
            const token = sessionStorage.getItem('token')
            const userData = { firstName, lastName, email, avatar };
            dispatch(userEdit(userData, id, token)); // requête pour modifier le profil du user
            // TODO : lors d'une modification des données, regénérer un password sinon le hash n'est plus lisible lors du login
        }
    }

    return (
        <div className="modal fade" id="editInfoProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form className="form-wrapper">
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

                            <label>
                                <p>Votre avatar (url)</p>
                                <input type="text" name="avatar" value={avatar} onChange={handleChange}
                                       placeholder="Votre avatar (url)" required />
                            </label>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={handleSubmit}>Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
