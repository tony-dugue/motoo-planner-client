import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

export function ChecklistShareContainer({ checklistsShare }) {
    return (
        <div className="checklist__container">

            <div className="checklist__todo-container">
                {checklistsShare && checklistsShare.map(item => (
                    <div className="checklist-item share-check-wrapper" key={item.id}>
                        <p className={item.checked ? 'checklist-item--done' : null}>
                            <span className="information__item-icon"><FontAwesomeIcon icon={faAngleRight}/></span>
                            {item.task}
                        </p>
                    </div>

                ))}
            </div>

        </div>
    );
}
