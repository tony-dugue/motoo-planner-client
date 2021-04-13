import React from 'react';
import {useDispatch} from "react-redux";
import {deleteStep, getLoading, getSuccess, getFailure} from 'features/roadbook/roadbookSlice';
import {stepDelete} from 'api/itineraryApi';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export function ItineraryStepItem({ stepId, type, title, icon }) {

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
      <li>
        <span className={type + "-icon"}><FontAwesomeIcon icon={icon} /></span>
        <div>
          {title}
          <button className="itinerary__step--delete" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </li>
  );
}
