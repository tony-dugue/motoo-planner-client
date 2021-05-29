import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {getShareRoadbook, selectRoadbook, selectSteps, getLoading, getSuccess, getFailure} from 'features/roadbook/roadbookSlice';
import {findShareRoadbook} from 'api/roadbookApi';
import {MapMini} from 'components/map/MapMini';
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {InformationShareContainer} from 'components/share/InformationShareContainer';
import {ChecklistShareContainer} from 'components/share/ChecklistShareContainer';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faMapMarkedAlt, faMotorcycle} from "@fortawesome/free-solid-svg-icons";

import moment from 'moment';
import localization from 'moment/locale/fr';


export function ShareScene() {

    const location = useLocation()
    const dispatch = useDispatch()

    const stepsTodo = useSelector(selectSteps);
    const { roadbook } = useSelector(selectRoadbook);

    // récupère slug
    const slug = location.pathname.replace('/share/', '');

    useEffect(() => {
        async function fetchData() {
            dispatch(getLoading())
            // on fait une requete API (api/share/:slug) pour récupérer les données du roadbook
            const result = await findShareRoadbook(slug)  // récupération depuis bdd avec requête API
            dispatch(getShareRoadbook(result))   // ajout du roadbook dans le store
            dispatch(getSuccess())
        }
        try {
            fetchData();
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning("une erreur s'est produite !")
        }
    }, [dispatch, slug])

    if (!roadbook) return (
        <div className="content">
            <h2>désolé, le roadbook n'existe pas !!</h2>
            <p>Veuillez saisir un code valide.</p>
            <Link to='/' className="btn btn-motoo-outline my-2 mx-2">Revenir à l'accueil</Link>
        </div>
    )

    // tri du tableau des étapes par date
    function custom_sort(a, b) {
        return new Date(a.stepDate).getTime() - new Date(b.stepDate).getTime()
    }
    // on récupère ici une copie d'un tableau [...stepsTodo] avant de faire le tri
    const stepsTodoSort = stepsTodo && [...stepsTodo].sort(custom_sort);

  return (
      <div className="share">

          <div className="container">
              <h2 className="roadbook-show__heading">Roadbook : <span>{roadbook.title}</span></h2>
          </div>

          <section>
              <div className="container">
                  {roadbook?.steps && (
                      <div className="row roadbook-show-map">
                          <div className="col-md-8">
                              <div className="roadbook-show-map__visualization">

                                  <MapMini />

                                  <p>{roadbook.description}</p>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="roadbook-show-map__resume">

                                  <p className="roadbook-show-map__resume-item">
                                      <span className="icon"><FontAwesomeIcon icon={faMapMarkedAlt}/></span>Départ de la balade:
                                  </p>

                                  <p className="address">{roadbook.steps[0].description}</p>


                                  <p className="roadbook-show-map__resume-item">
                                      <span className="icon"><FontAwesomeIcon icon={faCalendarAlt}/></span>
                                      Le {moment(roadbook.steps[0]?.stepDate).locale('fr', localization).format("L à H:mm")}
                                  </p>

                                  {roadbook.steps[1] && (
                                      <p  className="roadbook-show-map__resume-item">
                                          <span className="icon"><FontAwesomeIcon icon={faMotorcycle}/></span>
                                          Durée estimée:
                                          <span className="time">{
                                              // calcul durée entre étape précédente et l'étape suivante
                                              moment( stepsTodoSort[stepsTodoSort.length -1].stepDate).diff(moment(stepsTodoSort[0].stepDate), "hours")
                                          } heures</span>
                                      </p>)
                                  }

                              </div>
                          </div>
                      </div>
                  )}

              </div>
          </section>

          <section>
              <div className="container">
                  <div className="row">

                      {/* ========== résumé de l'itinéraire ============ */}

                      <div className="col-md-6">
                          <div className="roadbook-show-itinerary">

                              <h3 className="roadbook-show__heading-sub">Itinéraire</h3>

                              {/* étapes de la balade avec icones */}

                              <ul className="itinerary__step">
                                  {stepsTodoSort?.map((item, index) => (
                                      <React.Fragment key={item.id}>
                                          {(index !== 0) && <ItinerarySeparatorItem diffTime={
                                              // calcul durée entre étape précédente et l'étape suivante
                                              moment(item.stepDate).diff(moment(stepsTodoSort[index - 1].stepDate), "hours")
                                          }/>}

                                          <li className="itinerary__step-item">
                                              <div className="itinerary__step-item-icon">
                                                  <span className={item.type.slug + "-icon"}><FontAwesomeIcon icon={item.type.icon}/></span>
                                              </div>

                                              <div className="itinerary__step-item-content">
                                                  <p className="itinerary__step-item-content-date">
                                                      Le {moment.utc(item.stepDate).locale('fr', localization).format("L à H:mm")}
                                                  </p>
                                                  {item.title}
                                              </div>
                                          </li>
                                      </React.Fragment>
                                  ))}
                              </ul>

                          </div>
                      </div>

                      <div className="col-md-6">

                          {/* ========== informations pratiques ============ */}

                          <div className="roadbook-show-informations">

                              <h3 className="roadbook-show__heading-sub">Informations pratiques</h3>

                              <p className="roadbook-show__heading-desc">Personnes à contacter et quelques informations
                                  pratiques</p>

                              <InformationShareContainer informationsShare={roadbook.informations} />

                          </div>

                          {/* ========== checklist ============ */}

                          <div className="roadbook-show-checklist">

                              <h3 className="roadbook-show__heading-sub">CHECKLIST</h3>

                              <p className="roadbook-show__heading-desc">Liste des choses à ne pas oublier pour la
                                  balade</p>

                              <ChecklistShareContainer checklistsShare={roadbook.checklists} />

                          </div>
                      </div>
                  </div>
              </div>
          </section>

      </div>
  );
}
