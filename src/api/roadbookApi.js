import axios from "axios";

const rootUrl = "http://localhost:8000/api";
const roadbookUrl = rootUrl + "/roadbooks";

export const roadbookCreate = (roadbookData) => {

    const token = sessionStorage.getItem('accessJWT');

    const config = { headers: {"Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(roadbookUrl, roadbookData, config);
            resolve(res.data)
        } catch (err) {
            reject(err);
        }
    })
}

export const findSingleRoadbook = (urlPath) => {

    const token = sessionStorage.getItem('accessJWT');

    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(rootUrl + urlPath, config)
            resolve(res.data)
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const roadbookDelete = (roadbookId) => {

    const token = sessionStorage.getItem('accessJWT');

    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(roadbookUrl + `/${roadbookId}`, config)
            resolve(res.data)

        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const roadbookChangeStatus = (roadbookStatus, urlPath) => {

    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
    const body = JSON.stringify(roadbookStatus);

    return new Promise(async (resolve, reject) => {
        try {
            await axios.put(rootUrl + urlPath, body, config)

            const res = await axios.get(rootUrl + urlPath, config)
            resolve(res.data)

        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

