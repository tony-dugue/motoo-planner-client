import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addInformation, getLoading, getFailure} from 'features/roadbook/roadbookSlice';
import {informationCreate} from 'api/informationApi';
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";

export function InformationAddModal() {

    const dispatch = useDispatch()
    const location = useLocation()

    const [formData, setFormData] = useState({ name: "", phone: "", email: "", description: "" });


    const {name, phone, email, description} = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmitInfo = async e => {
        e.preventDefault();

        if (!name || !phone)
            toast.warning("Le nom et le téléphone est obligatoire")
        else {
            dispatch(getLoading())
            try {
                const urlPath = location.pathname.replace('roadbook', 'roadbooks')

                const informationData = {
                    description: description,
                    name: name,
                    phone: phone,
                    email: email,
                    roadbook: 'api' + urlPath
                }

                const registration = await informationCreate(informationData);

                const newInformation = {
                    id: registration.id,
                    description: registration.description,
                    name: registration.name,
                    phone: registration.phone,
                    email: registration.email
                }

                await dispatch(addInformation(newInformation))

            } catch (error) {
                dispatch(getFailure(error))
                toast.warning("une erreur s'est produite !")
            }
        }
    }

  return (
      <div className="modal fade" id="editInfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="content__form">
                      <form className="form-wrapper">

                          <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Ajouter des informations pratiques</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>

                          <div className="modal-body">

                              <div className="form-wrapper__bloc">
                                  <label htmlFor="nameInput" className="form-label">prénom (ou surnom) du contact (*)</label>
                                  <input type="text" className="form-control" id="nameInput" name="name"
                                         value={name} onChange={handleChange} required />
                              </div>

                              <div className="form-wrapper__bloc">
                                  <label htmlFor="phoneInput" className="form-label">Téléphone du contact (*)</label>
                                  <input type="text" className="form-control" id="phoneInput" name="phone"
                                         value={phone} onChange={handleChange} required />
                              </div>

                              <div className="form-wrapper__bloc">
                                  <label htmlFor="emailInput" className="form-label">Email du contact</label>
                                  <input type="email" className="form-control" id="emailInput" name="email"
                                         value={email} onChange={handleChange} />
                              </div>

                              <div className="form-wrapper__bloc">
                                  <label htmlFor="descriptionInput" className="form-label">Une description (facultatif)</label>
                                  <input type="text" className="form-control" id="descriptionInput" name="description"
                                         value={description} onChange={handleChange} />
                              </div>

                              <div id="passwordHelpBlock" className="form-text">
                                  (*) champs obligatoires
                              </div>

                          </div>

                          <div className="modal-footer">
                              <button type="button" className="btn btn-motoo-outline-blue" data-bs-dismiss="modal">Annuler
                              </button>
                              <button type="button" className="btn btn-motoo-outline" data-bs-dismiss="modal"
                                      onClick={handleSubmitInfo}>Ajouter
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
}
