import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {InformationAddModal} from 'features/information/InformationAddModal';

export function InformationAdd() {

  return (
   <div className="information__add">

       <button className="btn btn-motoo-blue information__add-btn" data-bs-toggle="modal" data-bs-target="#editInfo">
           <FontAwesomeIcon icon={faPlus}/>
       </button>

       <InformationAddModal />

   </div>
  );
}
