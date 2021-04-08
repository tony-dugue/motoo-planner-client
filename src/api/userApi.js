import axios from "axios";
import jwt_decode from "jwt-decode";

const rootUrl = "http://localhost:8000/api";
const loginUrl = rootUrl + "/login_check";
const userProfilUrl = rootUrl + "/users";

export const userRegistration = data => {

    const config = { headers: { "Content-Type": "application/json"} };
    const body = JSON.stringify(data);

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(userProfilUrl, body, config);
            resolve(res.data)
            if (res.data.status === "success") resolve(res.data)
        } catch (err) {
            reject(err);
        }
    })
}

export const userLogin = credentials => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(loginUrl, credentials)
            if (res.status === 200) {
                sessionStorage.setItem("accessJWT", res.data.token)
                localStorage.setItem("refreshJWT", res.data.refresh_token)
                sessionStorage.setItem('id', jwt_decode(res.data.token).id);
            }

            resolve(res)

        } catch (err) {
            reject(err);
        }
    })
}

export const findUser = () => {

    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('accessJWT');

    const config = { headers: { "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(userProfilUrl + `/${id}`, config)
            resolve(res.data)
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const userEdit = (userData) => {

    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('accessJWT');

    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
    const body = JSON.stringify(userData);

    return new Promise(async (resolve, reject) => {
        try {

            await axios.put(userProfilUrl + `/${userId}`, body, config)

            const res = await axios.get(userProfilUrl + `/${userId}`, config)
            resolve(res.data)

        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const userDelete = () => {

    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('accessJWT');

    const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(userProfilUrl + `/${userId}`, config)

            sessionStorage.removeItem("accessJWT")
            localStorage.removeItem("refreshJWT")
            sessionStorage.removeItem('id');

            resolve(res.data)

        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const userLogout = () => {
    sessionStorage.removeItem("accessJWT")
    localStorage.removeItem("refreshJWT")
    sessionStorage.removeItem('id');
}


