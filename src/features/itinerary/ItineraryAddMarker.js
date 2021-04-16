import React, {useState} from 'react';
import { useMapEvents } from "react-leaflet";
import {ItineraryAddModal} from 'features/itinerary/ItineraryAddModal';
import {stepCreate} from 'api/itineraryApi';
import {selectRoadbook, addStep, getLoading, getFailure} from 'features/roadbook/roadbookSlice';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import controlGeocoder from "leaflet-control-geocoder";

export function ItineraryAddMarker() {

    const dispatch = useDispatch()

    // récupération des données du roadbook en cours dans le store
    const roadbook = useSelector(selectRoadbook);

    // création de 2 états local permettant de récupérer les données (position et adresse)
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState("")
    // création d'un état pour gérer l'affichage de la fenêtre modale
    const [open, setOpen] = React.useState(false);

    // initialisation de la librairie nominatim pour la récupération de l'adresse
    const geocoder = controlGeocoder.nominatim();

    // Hook de react-Leflet avec rôle d'écouteur d'évènement
    useMapEvents({
        // sélection du type d'évènement (déclenchement ici lors d'un clic sur la carte)
        click: (e) => {
            setPosition(e.latlng); // ajout de la position dans le state

            // récupération de l'adresse de la position
            geocoder.reverse(e.latlng, 3, results => {
                const stepAddress = results[0];
                setAddress(stepAddress.name)
            });
            setOpen(true);  // ouverture de la modal
        },
    });

    const [formData, setFormData] = useState(
        { title: "", description: "", stepDay: "", stepHour: "", type: 1}
    );

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleClose = () => setOpen(false); // fermeture de la modal

    // exécuté lors de la soumission du formulaire
    const handleStepSubmit = async e => {
        e.preventDefault();

        // vérification si l'heure et la date sont présente
        if (!formData.stepDay || !formData.stepHour)
            toast.warning("une date et une heure est obligatoire")
        else {
            dispatch(getLoading())
            try {
                /* récupération des données du formulaire dans les états locales */
                const stepData = {
                    title: formData.title,
                    description: address,
                    type: 'api/types/' + formData.type,
                    stepDate: formData.stepDay + "T" + formData.stepHour + ":00+00:00",
                    stepLat: position.lat,
                    stepLong: position.lng,
                    roadbook: 'api/roadbooks/' + roadbook.roadbook.id
                }

                /* on réinitialise la valeur du select */
                setFormData({...formData, type: 1})

                /* envoi des données avec requête à l'API et ajout dans base de donnée */
                const registration = await stepCreate(stepData)

                /* on crée un objet formatté pour l'insertion dans le state */
                const newStep = {
                    id: registration.id,
                    stepDate: registration.stepDate,
                    stepLat: registration.stepLat,
                    stepLong: registration.stepLong,
                    title: registration.title,
                    description: registration.description,
                    type: {
                        name: registration.type.name,
                        icon: registration.type.icon,
                        slug: registration.type.slug
                    }
                }
                /* ajout dans le store */
                await dispatch(addStep(newStep))
                setOpen(false);  // fermeture de la modal
            } catch (error) {
                dispatch(getFailure(error))
                toast.warning("une erreur s'est produite !")
            }
        }
    }

    return position === null ? null : (
        <ItineraryAddModal handleClose={handleClose}
                           handleChange={handleChange}
                           handleStepSubmit={handleStepSubmit}
                           open={open}
                           formData={formData}
                           position={position}
                           address={address}
        />
    );
}
