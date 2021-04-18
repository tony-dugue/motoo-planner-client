import React from 'react';
import {roadbookChangeStatus} from 'api/roadbookApi';
import {useHistory, useLocation} from "react-router-dom";

export function RoadbookStatusModal({ roadbook }) {

    const location = useLocation()
    const history = useHistory();

    //récupération du pathname de l'url (ex /roadbooks/xx)
    const urlPath = location.pathname.replace('roadbook', 'roadbooks')

    const handleChangeStatus = async () => {
        const roadbookStatus = (roadbook.status === 1) ? {'status': 2} : {'status': 1}
        await roadbookChangeStatus(roadbookStatus, urlPath)
        history.push('/dashboard');
    }

  return (

      <div className="roadbook-show-gestion__check-wrapper">
          <div className="roadbook-show-gestion__check">
              <p>Roadbook terminé ?</p>
              <form>
                  <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="roadbookCheck"
                             onClick={handleChangeStatus}
                             defaultChecked={roadbook.status === 2 ? 'checked' : ''}/>
                  </div>
              </form>
          </div>

          {roadbook.status === 2 && <p>code de partage: <span className="share">{roadbook.shareLink}</span></p>}

      </div>
  );
}
