import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectUser, getLoading, getFailure, getSuccess} from 'features/user/userSlice';
import {userEdit, findUser} from 'api/userApi';
import {toast} from "react-toastify";

const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function UserEditModal() {

    const dispatch = useDispatch()

    const {userProfile} = useSelector(selectUser);

    const [formData, setFormData] = useState({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        avatar: userProfile.avatar
    });

    const {firstName, lastName, email, avatar} = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();

        if (!emailValidator.test(email))
            toast.warning("Votre email n'est pas au bon format")
        else {
            dispatch(getLoading())
            try {
                const userData = {firstName, lastName, email, avatar};
                await userEdit({userData});
                dispatch(getSuccess())
            } catch (error) {
                dispatch(getFailure(error))
                toast.warning("une erreur s'est produite !")
            }

            // TODO : lors d'une modification des données, regénérer un password sinon le hash n'est plus lisible lors du login
        }
    }

    return (
        <div className="modal fade" id="editInfoProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="content__form">
                        <form className="form-wrapper">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier les informations</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">

                                <div className="form-wrapper__bloc">
                                    <label htmlFor="firstnameInput" className="form-label">Votre prénom</label>
                                    <input type="text" className="form-control" id="firstnameInput" name="firstName"
                                           value={firstName} onChange={handleChange} required/>
                                </div>

                                <div className="form-wrapper__bloc">
                                    <label htmlFor="lastnameInput" className="form-label">Votre nom</label>
                                    <input type="text" className="form-control" id="lastnameInput" name="lastName"
                                           value={lastName} onChange={handleChange} required/>
                                </div>

                                <div className="form-wrapper__bloc">
                                    <label htmlFor="emailInput" className="form-label">Votre email</label>
                                    <input type="email" className="form-control" id="emailInput" name="email"
                                           value={email} onChange={handleChange} required/>
                                </div>


                                <div className="form-wrapper__bloc">

                                    <label htmlFor="avatarInput" className="form-label">
                                        {avatar ? 'Modifier votre avatar' : 'Ajouter un avatar'}
                                    </label><br/>

                                    { avatar
                                        ? (<img src={avatar} alt="placeholder" className="roadbook-form__img"/>)
                                        : null }

                                    <input type="file" name="avatar" className="form-control" id="avatarInput"
                                           onChange={handleChange}/>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-motoo-outline-blue" data-bs-dismiss="modal">Annuler
                                </button>
                                <button type="button" className="btn btn-motoo-outline" data-bs-dismiss="modal"
                                        onClick={handleSubmit}>Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
