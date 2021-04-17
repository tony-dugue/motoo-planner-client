import axios from "axios";

const rootUrl = "http://localhost:8000/api";
const checklistUrl = rootUrl + "/checklists";

export const checklistCreate = data => {

    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
    const body = JSON.stringify(data);

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(checklistUrl, body, config);
            resolve(res.data)

        } catch (err) {
            reject(err);
        }
    })
}

export const checklistCheck = (id, checkedStatus) => {

    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
    const body = JSON.stringify(checkedStatus)

    return new Promise(async (resolve, reject) => {
        try {
            await axios.put(checklistUrl + `/${id}`, body, config)
        } catch (error) {
            reject(error.message);
        }
    })
}

export const checklistDelete = id => {

    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(checklistUrl + `/${id}`, config)
            resolve(res.data)
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}
