import React from 'react';
import {useDispatch} from "react-redux";
import {deleteStep, getLoading, getSuccess, getFailure} from 'features/roadbook/roadbookSlice';
import {stepDelete} from 'api/itineraryApi';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import moment from 'moment';
import localization from 'moment/locale/fr';

export function ItineraryStepItem({stepId, type, title, icon, stepDate, description}) {

    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            dispatch(getLoading())
            await stepDelete(stepId);
            dispatch(deleteStep(stepId))
            dispatch(getSuccess())
        } catch (error) {
            dispatch(getFailure(error))
        }
    }

    return (
        <li className="itinerary__step-item">
            <div className="itinerary__step-item-icon">
                <span className={type + "-icon"}><FontAwesomeIcon icon={icon}/></span>
            </div>

            <div className="itinerary__step-item-content">
                <p className="itinerary__step-item-content-date">
                    Le {moment(stepDate).locale('fr', localization).format("L à H:mm")}
                </p>
                {title}
                <button className="itinerary__step--delete" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                {description}

            </div>
        </li>
    );
}
