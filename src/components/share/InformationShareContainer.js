import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

export function InformationShareContainer({informationsShare}) {

    return (
        <div className="information__todo-container">

            {informationsShare && (informationsShare.map(item => (
                <div className="information__item" key={item.id}>

                    <p className="information__item-name">{item.name}</p>

                    <p><span className="information__item-icon"><FontAwesomeIcon icon={faPhoneAlt}/></span>
                        {item.phone}
                    </p>

                    {item.email &&
                    <p><span className="information__item-icon"><FontAwesomeIcon icon={faEnvelope}/></span> {item.email}</p>}

                    {item.description && <p className="information__item-desc">{item.description}</p>}

                </div>
            )))}

        </div>
    );
}
