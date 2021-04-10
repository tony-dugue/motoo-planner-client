import axios from "axios";
import jwt_decode from "jwt-decode";
import { getLoading, getSuccess, getFailure } from "features/user/userSlice";

const rootUrl = "http://localhost:8000/api";
const loginUrl = rootUrl + "/login_check";
const userProfilUrl = rootUrl + "/users";
const newAccessJWT = rootUrl + "/token/refresh";

export const userRegistration = data => {

    const config = { headers: { "Content-Type": "application/json"} };
    const body = JSON.stringify(data);

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(userProfilUrl, body, config);
            resolve(res.data)
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
                sessionStorage.setItem('id', jwt_decode(res.data.token).id);
                sessionStorage.setItem("accessJWT", res.data.token)
                localStorage.setItem("motooSite", JSON.stringify({refreshJWT: res.data.refresh_token}))
            }

            resolve(res)

        } catch (err) {
            reject(err);
        }
    })
}

export const findUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = sessionStorage.getItem('id');
            const token = sessionStorage.getItem('accessJWT');

            if (!token) {
                reject("Token not found")
            }

            const config = { headers: { "Authorization" : `Bearer ${token}` } };

            const res = await axios.get(userProfilUrl + `/${id}`, config)
            resolve(res.data)
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch(getLoading());

        const result = await findUser();

        if (result && result.id)
            return dispatch(getSuccess(result.user));

        dispatch(getFailure("l'utilisateur n'a pas été trouvé !"));
    } catch (error) {
        dispatch(getFailure(error));
    }
};

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
            localStorage.removeItem("motooSite")
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
    localStorage.removeItem("motooSite")
    sessionStorage.removeItem('id');
}

export const fetchNewAccessJWT = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const { refreshJWT } = JSON.parse(localStorage.getItem("motooSite"));

            if (!refreshJWT) reject("Token not found!");

            const config = { headers: { "Authorization" : `Bearer ${refreshJWT}` } };

            const res = await axios.get(newAccessJWT, config)

            if (res.status === 200) sessionStorage.setItem("accessJWT", res.data.accessJWT);

            resolve(true);
        } catch (error) {
            if (error.message === "Request failed with status code 403") {
                localStorage.removeItem("motooSite");
            }
            reject(false);
        }
    });
};

