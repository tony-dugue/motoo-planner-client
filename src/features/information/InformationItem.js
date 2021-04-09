import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhoneAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import {deleteInformation} from 'features/information/informationSlice';
import {useDispatch} from "react-redux";

export function InformationItem({ id, name, phone, email, description }) {

    const dispatch = useDispatch()

    const handleDelete = () => dispatch(deleteInformation(id))

  return (
   <div className="information__item">

       <span className="information__item--delete" onClick={handleDelete}><FontAwesomeIcon icon={faTimes}/></span>

       <p className="information__item-name">{name}</p>

       <p><span className="information__item-icon">
           <FontAwesomeIcon icon={faPhoneAlt}/></span>
           {phone}
       </p>

       { email && <p><span className="information__item-icon"><FontAwesomeIcon icon={faEnvelope}/></span> {email}</p> }

       { description && <p className="information__item-desc">{description}</p>}

   </div>
  );
}
