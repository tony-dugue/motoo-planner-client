import React, {useState} from 'react';
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { roadbookCreate } from 'features/roadbook/roadbookSlice';

export function RoadbookCreate() {

    const dispatch = useDispatch()
    const history = useHistory();

    const [formData, setFormData] = useState({title: "", description: "", imageUrl: "", tripStart: ""});

    const { title, description, pictureUrl, tripStart } = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        const id = sessionStorage.getItem('id')
        const token = sessionStorage.getItem('token')
        const user = `api/users/${id}`
        const newRoadbook = { title, description, pictureUrl, tripStart, user };
        dispatch(roadbookCreate(newRoadbook, token)); // requête à l'API pour créer un roadbook
        toast.success("Votre roadbook a bien été crée")
        history.push('/dashboard');
    }

  return (
      <div className="container">

          <form onSubmit={handleSubmit} className="form-wrapper">

              <label>
                  <p>Nom du roadbook</p>
                  <input type="text" name="title" value={title} onChange={handleChange}
                         placeholder="Le nom du roadbook" required />
              </label>

              <label>
                  <p>Date de départ</p>
                  <input type="date" name="tripStart" value={tripStart} onChange={handleChange}
                         placeholder="Le nom du roadbook" required />
              </label>

              <label>
                  <p>Description</p>
                  <input type="text" name="description" value={description} onChange={handleChange}
                         placeholder="Description" required />
              </label>

              <label>
                  <p>Ajouter une image d'illustration</p>
                  <input type="text" name="pictureUrl" value={pictureUrl} onChange={handleChange}
                         placeholder="Url de l'image de couverture" />
              </label>

              {/* user automatique .... */}

              <div>
                  <button type="submit">Créer le roadbook</button>
              </div>
          </form>
      </div>
  );
}
