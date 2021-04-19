import axios from "axios";

const rootUrl = "http://localhost:8000/api";
const itineraryUrl = rootUrl + "/types";
const stepUrl = rootUrl + "/steps";

/* récupération des types pour affichage dans menu déroulant modal lors création d'une étape */
export const findTypes = () => {

    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(itineraryUrl, config);
            resolve(res.data["hydra:member"])
        } catch (err) {
            reject(err);
        }
    })
}

/* création d'une étape */
export const stepCreate = data => {

    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
    const body = JSON.stringify(data);

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(stepUrl, body, config);
            resolve(res.data)

        } catch (err) {
            reject(err);
        }
    })
}

/* suppression d'une étape */
export const stepDelete = id => {

    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(stepUrl + `/${id}`, config)
            resolve(res.data)
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}
