import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { userEdit } from 'features/user/userSlice';

const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

// mot de passe: minimum de 8 caractères, contient au moins 1 un chiffre, 1 lettre minuscule, 1 lettre majuscule
//               et seulement des lettres et des chiffres

export function UserEditPasswordModal() {

    const dispatch = useDispatch()

    const [formPwd, setFormPwd] = useState({
        password: '',
        passwordConfirm: ''
    })

    const { password, passwordConfirm } = formPwd;

    const handleChange = e => setFormPwd({...formPwd, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        //if(!passwordValidator.test(password)) {
            //console.log("Le mot de passe ne respecte pas les règles")  // TODO ajouter un affichage en alerte !!
        if(password !== passwordConfirm) {
            console.log("Les mots de passe ne sont pas identique !!")  // TODO ajouter un affichage en alerte !!
        } else {
            const id = sessionStorage.getItem('id')
            const token = sessionStorage.getItem('token')
            const userData = { password };
            dispatch(userEdit(userData, id, token)); // requête pour modifier le profil du user
        }
    }

    return (
        <div className="modal fade" id="editPasswordProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form className="form-wrapper">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modifier le mot de passe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label>
                                <p>Votre mot de passe</p>
                                <input type="password" name="password" value={password} onChange={handleChange}
                                       placeholder="Créer un mot de passe" minLength="6" required />
                            </label>
                            <label>
                                <p>Répéter votre mot de passe</p>
                                <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={handleChange}
                                       placeholder="Répéter le mot de passe" minLength="6" required />
                            </label>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={handleSubmit}>Confirmer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
