import axios from "axios";

const rootUrl = "http://localhost:8000/api";
const checklistUrl = rootUrl + "/checklists";

const token = sessionStorage.getItem('accessJWT');

export const checklistCreate = data => {
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
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(checklistUrl + `/${id}`, config)
            console.log(res)
            resolve(res.data)
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}
