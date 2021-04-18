import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {getShareRoadbook, getLoading, getSuccess, getFailure} from 'features/roadbook/roadbookSlice';
import {findShareRoadbook} from 'api/roadbookApi';
import {useDispatch} from "react-redux";

export function ShareScene() {

    const location = useLocation()
    const dispatch = useDispatch()

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
    }, [dispatch])

  return (
   <div>
        <h1>Je suis la page share</h1>
   </div>
  );
}
