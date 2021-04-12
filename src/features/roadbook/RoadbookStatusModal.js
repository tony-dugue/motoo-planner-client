import React from 'react';
import {roadbookChangeStatus} from 'api/roadbookApi';
import {useLocation} from "react-router-dom";

export function RoadbookStatusModal({ roadbook }) {

    const location = useLocation()

    //récupération du pathname de l'url (ex /roadbooks/xx)
    const urlPath = location.pathname.replace('roadbook', 'roadbooks')

    const handleChangeStatus = async () => {
        const roadbookStatus = roadbook.status === 1 ? {'status': 2} : {'status': 1}
        await roadbookChangeStatus(roadbookStatus, urlPath)
    }

  return (
      <form>
          <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="roadbookCheck"
                     onClick={handleChangeStatus}
                     defaultChecked={roadbook.status === 2 ? 'checked' : ''}/>
          </div>
      </form>
  );
}
