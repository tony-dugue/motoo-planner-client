import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {userEdit} from 'api/userApi';
import {toast} from "react-toastify";
import { getLoading, getFailure, getSuccess} from 'features/user/userSlice';

const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

// mot de passe: minimum de 8 caractères, contient au moins 1 un chiffre, 1 lettre minuscule, 1 lettre majuscule
// et seulement des lettres et des chiffres

export function UserEditPasswordModal() {

    const dispatch = useDispatch()

    const [formPwd, setFormPwd] = useState({
        password: '',
        passwordConfirm: ''
    })

    const {password, passwordConfirm} = formPwd;

    const handleChange = e => setFormPwd({...formPwd, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();

        if (!passwordValidator.test(password))
            toast.warning("Le mot de passe ne respecte pas les règles (doit contenir un minimum de 8 caractères et contenir au" +
                " moins 1 chiffre, 1 lettre minusculet et 1 lettre minuscule")
        else if (password !== passwordConfirm)
            toast.warning("Les mots de passe ne sont pas identique !")
        else {
            dispatch(getLoading())
            try {
                await userEdit({password});
                dispatch(getSuccess())
            } catch (error) {
                dispatch(getFailure(error))
                toast.warning("une erreur s'est produite !")
            }
        }
    }

    return (
        <div className="modal fade" id="editPasswordProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="content__form">
                        <form className="form-wrapper">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier le mot de passe</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">

                                <div className="form-wrapper__bloc">
                                    <label htmlFor="passwordInput" className="form-label">Votre nouveau mot de passe</label>
                                    <input type="password" className="form-control" id="passwordInput" name="password"
                                           value={password} onChange={handleChange} minLength="8" required />
                                </div>

                                <div className="form-wrapper__bloc">
                                    <label htmlFor="passwordVerifyInput" className="form-label">Répéter le mot de passe</label>
                                    <input type="password" className="form-control" id="passwordVerifyInput" name="passwordConfirm"
                                           value={passwordConfirm} onChange={handleChange} minLength="8" required />
                                </div>

                                <div id="passwordHelpBlock" className="form-text">
                                    Le mot de passe doit contenir au moins 8 caractères, contenir au moins 1 majuscule, 1 minuscule et 1 chiffre.
                                    Seulement des lettres et chiffres (pas de caractères spéciaux, espaces ou émoji)
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-motoo-outline-blue" data-bs-dismiss="modal">Annuler
                                </button>
                                <button type="button" className="btn btn-motoo-outline" data-bs-dismiss="modal"
                                        onClick={handleSubmit}>Confirmer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
