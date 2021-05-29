import React, {useState} from 'react';
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {roadbookCreate} from 'api/roadbookApi';
import {addRoadbook, getLoading, getFailure} from 'features/user/userSlice';

import illustration from "../../assets/images/illustration1.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export function RoadbookCreate() {

    const dispatch = useDispatch()
    const history = useHistory();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tripStart, setTripStart] = useState("")

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(getLoading())
        try {
            const id = sessionStorage.getItem('id');
            const roadbookData = {title: title, description: description, tripStart: tripStart, user: `api/users/${id}`}

            /* envoi des données avec requête à l'API et ajout dans base de donnée */
            const res = await roadbookCreate(roadbookData);
            if (res.status !== 200) dispatch(getFailure(res.message))

            /* on crée un objet formatté pour l'insertion dans le state */
            const newRoadbook = {
                id: `api/users/${id}`,
                title: title,
                description: description,
                status: 1,
                createdAt: tripStart
            }

            /* ajout dans le store */
            await dispatch(addRoadbook(newRoadbook))

            toast.success(<span><span class="toast-icon success"><FontAwesomeIcon icon={faCheck} /></span>Votre roadbook a bien été crée</span>)
            history.push('/dashboard');
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning(<span><span class="toast-icon warning"><FontAwesomeIcon icon={faExclamationTriangle} /></span>Une erreur s'est produite ! Veuillez vérifier les champs</span>)
        }
    }

    return (
        <div className="container">

            <form onSubmit={handleSubmit} className="roadbook-form form-wrapper">

                <div className="row roadbook-form__wrapper">
                    <div className="col-md-6 roadbook-form__col">

                            <div className="form-wrapper__bloc">
                                <label htmlFor="titleInput" className="form-label">Nom du roadbook</label>
                                <input type="text" name="title" className="form-control" id="titleInput"
                                       value={title} onChange={ e => setTitle(e.target.value)} required />
                            </div>

                            <div className="form-wrapper__bloc">
                                <label htmlFor="dateInput" className="form-label">Date et heure de départ</label>
                                <input type="datetime-local" name="tripStart" className="form-control" id="dateInput"
                                       value={tripStart} onChange={e => setTripStart(e.target.value)} required />
                            </div>

                            <div className="form-wrapper__bloc">
                                <label htmlFor="descInput" className="form-label">Description</label>
                                <textarea className="form-control" name="description" id="descInput" rows="3"
                                          value={description} onChange={e => setDescription(e.target.value)} required>
                            </textarea>

                        </div>
                    </div>


                    <div className="col-md-6 roadbook-form__col">
                        {/*
                        <div className="form-wrapper__bloc">
                            <label htmlFor="pictureInput" className="form-label">Ajouter une image d'illustration</label>
                            <img src={placeholder} alt="placeholder" className="roadbook-form__img" />
                            <input type="file" name="pictureUrlFile" className="form-control" id="pictureInput"
                                   onChange={handleFileInput} />
                        </div>
                        */}

                        <img src={illustration} alt="placeholder" className="roadbook-form__img" />


                    </div>

                    <div className="roadbook-form__submit">
                        <button type="submit" className="btn btn-motoo-outline">Créer le roadbook</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
