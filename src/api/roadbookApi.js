import axios from "axios";

const rootUrl = "http://localhost:8000/api";
const roadbookUrl = rootUrl + "/roadbooks";

export const roadbookCreate = (title, description, tripStart, pictureUrl) => {

    const token = sessionStorage.getItem('accessJWT');

    const id = sessionStorage.getItem('id');

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tripStart', tripStart);
    formData.append('pictureUrl', pictureUrl);
    formData.append('user', `api/users/${id}`);

    //const roadbookData = {'title': title, 'description': description, 'tripStart': tripStart, 'user': `api/users/${id}`}

    const config = { headers: {"Content-Type": "multipart/form-data", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(roadbookUrl, formData, config);
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

