import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userAuth: {},
    userProfile: {},
    token: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.userAuth = action.payload
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
            state.loading = false
        },
        setUserToken: (state, action) => {
            state.token = action.payload
        },
        setUserLogout: state => {
            state.userAuth = {}
            state.userProfile = {}
            state.token = null
        },
        getLoading: state => {
            state.loading = true
        },
        getFailure: state => {
            state.loading = false
            state.errors = true
        },
        getSuccess: state => {
            state.loading = false
        },
    }
})

const { reducer, actions } = userSlice;

export const { setUserLogin, setUserToken, setUserProfile, setUserLogout, getLoading, getFailure, getSuccess } = actions

export default reducer;

export const selectUser = state => state.user;







/*
// fonction 'thunk' permettant de faire une logique asynchrone).
export function userLogin(credentials) {

    return async dispatch => {
        dispatch(getLoading())

        // ON VERIFIE L'UTILISATEUR ET ON RECUPERE LE TOKEN DE L'UTILISATEUR
        await axios.post(process.env.REACT_APP_API_URL + '/login_check', credentials)
            .then(res => {
                dispatch(setUserToken(res.data.token))
                dispatch(setUserLogin(jwt_decode(res.data.token)))
                Storage.set('token', res.data.token);
                Storage.set('id', jwt_decode(res.data.token).id);
                Storage.set("motooSite", JSON.stringify({"refreshJWT": res.data.refresh_token}))
                const config = { headers: { "Authorization" : `Bearer ${res.data.token}` } };

                // ON RECUPERE LES INFORMATIONS DE L'UTILISATEUR
                axios.get(process.env.REACT_APP_API_URL + `/users/${jwt_decode(res.data.token).id}`, config)
                    .then(res => {
                        dispatch(setUserProfile(res.data))
                        toast.success('Bienvenue')
                    })
                    .catch(error => {dispatch(getFailure(error))} )

            })
            .catch( () => toast.warning("une erreur s'est produite ! Veuillez vérifier votre email et ressaisir votre mot de" +
                    " passe")
            )
    }
}

export function userRegister(newUser) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json"} };
        const body = JSON.stringify(newUser);
        return axios.post(process.env.REACT_APP_API_URL + '/users', body, config)
            .catch( () => toast.warning("une erreur s'est produite !"))
    }
}

export function userLogout() {
    return async dispatch => {
        dispatch(getLoading())
        sessionStorage.removeItem("accessJWT")
        localStorage.removeItem("refreshJWT")
        sessionStorage.removeItem('id');
        dispatch(setUserLogout())
    }
}

export function findUser(params, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Authorization" : `Bearer ${token}` } };
        axios.get(process.env.REACT_APP_API_URL + `/users/${params}`, config)
            .then(res => dispatch(setUserProfile(res.data)))
            .catch(error => console.log(error))
    }
}

export function userEdit(userData, userId, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
        const body = JSON.stringify(userData);

        await axios.put(process.env.REACT_APP_API_URL + `/users/${userId}`, body, config)
            .catch(error => toast.warning("Une erreur s'est produite !"))
        // ON RECUPERE LES INFORMATIONS DE L'UTILISATEUR
        await axios.get(`http://127.0.0.1:8000/api/users/${userId}`, config)
            .then(res => dispatch(setUserProfile(res.data)))
            .catch(error => console.log(error))
        // ON GENERE UN NOUVEAU TOKEN

    }
}

export function userDelete(userId, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
        await axios.delete(process.env.REACT_APP_API_URL + `/users/${userId}`, config)
            .then(res => toast.info('Votre compte a bien été supprimé'))
            .catch(error => console.log(error))
        sessionStorage.removeItem("accessJWT")
        localStorage.removeItem("refreshJWT")
        sessionStorage.removeItem('id');
        dispatch(setUserLogout())
    }
}

*/

