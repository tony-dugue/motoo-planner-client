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

    const roadbook = useSelector(selectRoadbook);

    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState("")
    const [open, setOpen] = React.useState(false);

    const geocoder = controlGeocoder.nominatim();

    useMapEvents({
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

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        stepDay: "",
        stepHour: "",
        type: 1
    });

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleClose = () => setOpen(false); // fermeture de la modal

    const handleStepSubmit = async e => {
        e.preventDefault();

        if (!formData.stepDay || !formData.stepDay)
            toast.warning("une date et une heure est obligatoire")
        else {
            dispatch(getLoading())
            try {
                /* récupération des données du formulaire */
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

                /* ajout dans base de donnée via api */
                const registration = await stepCreate(stepData)

                console.log(registration)
                /* on crée un objet formatté pour le state */
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

                // TODO: ranger les étapes par date du plus récent au plus ancien
                // TODO: ouvrir le popup dans la carte lors du clic sur une étape à gauche

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
