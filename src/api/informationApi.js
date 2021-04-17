import axios from "axios";

const rootUrl = "http://localhost:8000/api";
const informationUrl = rootUrl + "/information";

export const informationCreate = data => {
    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
    const body = JSON.stringify(data);

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(informationUrl, body, config);
            resolve(res.data)

        } catch (err) {
            reject(err);
        }
    })
}

export const informationDelete = id => {
    const token = sessionStorage.getItem('accessJWT');
    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(informationUrl + `/${id}`, config)
            resolve(res.data)
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}
