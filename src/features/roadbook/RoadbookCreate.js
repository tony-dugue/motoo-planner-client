import React, {useState} from 'react';
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {roadbookCreate} from 'api/roadbookApi';
import {getLoading, getFailure} from 'features/roadbook/roadbookSlice';

import placeholder from "../../assets/images/placeholder.png";


export function RoadbookCreate() {

    const dispatch = useDispatch()
    const history = useHistory();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tripStart, setTripStart] = useState("")
    const [pictureUrlFile, setPictureUrlFile] = useState(null)

    const handleFileInput = e => {
        // handle validations
        //const file = e.target.files[0];
        //if (file.size > 1024) toast.warning('la taille du fichier ne doit pas dépasser 1MB')
        //else
        setPictureUrlFile(e.target.files[0])
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(getLoading())
        try {
            const res = roadbookCreate(pictureUrlFile, title, description, tripStart);
            if (res.status !== 200) dispatch(getFailure(res.message))
            toast.success("Votre roadbook a bien été crée")
            history.push('/dashboard');
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning("une erreur s'est produite ! Veuillez vérifier les champs")
        }
    }

    return (
        <div className="container">

            <form onSubmit={handleSubmit} className="roadbook-form form-wrapper">

                <div className="row">
                    <div className="col-md-6 roadbook-form__col">

                            <div className="form-wrapper__bloc">
                                <label htmlFor="titleInput" className="form-label">Nom du roadbook</label>
                                <input type="text" name="title" className="form-control" id="titleInput"
                                       value={title} onChange={ e => setTitle(e.target.value)} required />
                            </div>

                            <div className="form-wrapper__bloc">
                                <label htmlFor="dateInput" className="form-label">Date de départ</label>
                                <input type="date" name="tripStart" className="form-control" id="dateInput"
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

                        <div className="form-wrapper__bloc">
                            <label htmlFor="pictureInput" className="form-label">Ajouter une image d'illustration</label>
                            <img src={placeholder} alt="placeholder" className="roadbook-form__img" />
                            <input type="file" name="pictureUrlFile" className="form-control" id="pictureInput"
                                   onChange={handleFileInput} />
                        </div>

                    </div>

                    <div className="roadbook-form__submit">
                        <button type="submit" className="btn btn-motoo-outline">Créer le roadbook</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
