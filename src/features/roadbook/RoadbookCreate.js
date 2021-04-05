import React, {useState} from 'react';
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {roadbookCreate} from 'features/roadbook/roadbookSlice';
import placeholder from "../../images/placeholder.png";

export function RoadbookCreate() {

    const dispatch = useDispatch()
    const history = useHistory();

    const [formData, setFormData] = useState({title: "", description: "", imageUrl: "", tripStart: ""});

    const {title, description, pictureUrl, tripStart} = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        const id = sessionStorage.getItem('id')
        const token = sessionStorage.getItem('token')
        const user = `api/users/${id}`
        const newRoadbook = {title, description, pictureUrl, tripStart, user};
        dispatch(roadbookCreate(newRoadbook, token)); // requête à l'API pour créer un roadbook
        toast.success("Votre roadbook a bien été crée")
        history.push('/dashboard');
    }

    return (
        <div className="container">

            <form onSubmit={handleSubmit} className="roadbook-form form-wrapper">

                <div className="row">
                    <div className="col-md-6 roadbook-form__col">

                            <div className="form-wrapper__bloc">
                                <label htmlFor="titleInput" className="form-label">Nom du roadbook</label>
                                <input type="text" name="title" className="form-control" id="titleInput"
                                       value={title} onChange={handleChange} required />
                            </div>

                            <div className="form-wrapper__bloc">
                                <label htmlFor="dateInput" className="form-label">Date de départ</label>
                                <input type="date" name="tripStart" className="form-control" id="dateInput"
                                       value={tripStart} onChange={handleChange} required />
                            </div>

                            <div className="form-wrapper__bloc">
                                <label htmlFor="descInput" className="form-label">Description</label>
                                <textarea className="form-control" name="description" id="descInput" rows="3"
                                          value={description} onChange={handleChange} required>
                            </textarea>

                        </div>
                    </div>

                    <div className="col-md-6 roadbook-form__col">

                        <div className="form-wrapper__bloc">

                            <label htmlFor="pictureInput" className="form-label">Ajouter une image d'illustration</label>

                            <img src={placeholder} alt="placeholder" className="roadbook-form__img" />

                            <input type="file" name="pictureUrl" className="form-control" id="pictureInput"
                                   value={pictureUrl} onChange={handleChange} required />

                        </div>

                    </div>

                    {/* TODO: ajout de l'user automatique .... */}

                    <div className="roadbook-form__submit">
                        <button type="submit" className="btn btn-motoo-outline">Créer le roadbook</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
