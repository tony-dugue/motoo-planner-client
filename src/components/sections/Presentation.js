import React from 'react';
import presentationAddInfo from "../../assets/images/presentation-add-info.png";
import presentationAddStep from "../../assets/images/presentation-add-step.png";
import presentationMap from "../../assets/images/presentation-map.png";
import presentationNewRoadbook from "../../assets/images/presentation-new-roadbook.png";
import presentationRegister from "../../assets/images/presentation-register.png";
import presentationRoadbooks from "../../assets/images/presentation-roadbooks.png";

export function Presentation() {
  return (
      <div className="container">

          <div className="row presentation__row">
              <div className="col-md-7  order-md-2">
                  <h3 className="presentation__heading">Etape 1 :</h3>
                  <p>Je crée mon compte.</p>
              </div>
              <div className="col-md-5  order-md-1">
                  <img src={presentationRegister} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

          <div className="row presentation__row">
              <div className="col-md-7">
                  <h3 className="presentation__heading">Etape 2 :</h3>
                  <p>Une fois connecté, j'accède à mon tableau de bord où je peux retrouver l'ensemble
                      de mes roadbooks en cours et terminés.</p>
              </div>
              <div className="col-md-5">
                  <img src={presentationRoadbooks} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

          <div className="row presentation__row">
              <div className="col-md-7  order-md-2">
                  <h3 className="presentation__heading">Etape 3 :</h3>
                  <p>A l'aide d'un formulaire, j'ajoute un nouveau roadbook contenant la description de la balade.</p>
              </div>
              <div className="col-md-5  order-md-1">
                  <img src={presentationNewRoadbook} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

          <div className="row presentation__row">
              <div className="col-md-7">
                  <h3 className="presentation__heading">Etape 4 :</h3>
                  <p>Sur la page de visualisation d'un roadbook, j'ajoute des informations pratiques afin que les
                  participants puissent joindre facilement les responsable de la balade en cas de problème.</p><br />
                  <p>J'ajoute une liste de consignes importantes et de choses à ne pas oublier au cours de la balade.</p>
              </div>
              <div className="col-md-5">
                  <img src={presentationAddInfo} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

          <div className="row presentation__row">
              <div className="col-md-7  order-md-2">
                  <h3 className="presentation__heading">Etape 5 :</h3>
                  <p>Sur l'interface de planification d'itinéraire, je visualise en détail les différentes étapes
                      de la balade.</p>
              </div>
              <div className="col-md-5  order-md-1">
                  <img src={presentationMap} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

          <div className="row presentation__row">
              <div className="col-md-7">
                  <h3 className="presentation__heading">Etape 6 :</h3>
                  <p>Besoin d'une nouvelle étape ? J'en ajoute une à la balade facilement par un simple clic sur la carte.</p>
              </div>
              <div className="col-md-5">
                  <img src={presentationAddStep} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

      </div>
  );
}
