import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function ItineraryStepItem({ type, title, icon }) {

  return (
      <li>
          <span className={type + "-icon"}><FontAwesomeIcon icon={icon}/></span>
          {title}
      </li>
  );
}
