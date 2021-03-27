import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'

// un Slice dans Redux est un morceau d'état qui gère plusieurs variables et les rend globale.

// (1) on crée ici un state initial
// équivaut à const [token, setToken] = useState(<<null>>)
const initialState = {
    userAuth: {},
    token: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        // (2) on crée ici 2 fonctions (2 actions avec un rôle de setters pour modifier la valeur du state)
        // Le reducer met à jour les données dans le state (on gère ici toute l'activité du User)
        // cela équivaut à const [token, <<setToken>>] = useState(null)

        setUserLogin: (state, action) => {
            state.userAuth = action.payload
            state.loading = false
        },
        setUserToken: (state, action) => {
            state.token = action.payload
        },
        setUserLogout: state => {
            state.userAuth = {}
            state.token = null
        },
        getLoading: state => {
            state.loading = true
        },
        getFailure: state => {
            state.loading = false
            state.errors = true
        }
    }
})

// (3) on exporte les actions
export const { setUserLogin, setUserToken, setUserLogout, getLoading, getFailure } = userSlice.actions

export default userSlice.reducer

// fonction 'thunk' permettant de faire une logique asynchrone).
export function userLogin(credentials) {

    // decode le token en objet lisible (Working unicode text JWT parser function)
    // peut être remplacé par jwt-decode
    function parseJwt (token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
        // le token sera décodé et converti comme ceci :
        // {iat: 1616802554, exp: 1616806154, roles: Array(1), username: "Bridgette_Gleason@yahoo.com", id: 2}
    };

    return async dispatch => {
        dispatch(getLoading())
        return axios.post('http://127.0.0.1:8000/api/login_check', credentials)
            .then(res => {
                dispatch(setUserToken(res.data.token))
                dispatch(setUserLogin(parseJwt(res.data.token)))
                sessionStorage.setItem('token', JSON.stringify(res.data.token));
            })
            .catch(error => dispatch(getFailure(error)))  // TODO afficher un message d'erreur en alert
    }
}

export function userRegister(newUser) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json"} };
        const body = JSON.stringify(newUser);
        return axios.post('http://127.0.0.1:8000/api/users', body, config)
            .catch(error => dispatch(getFailure(error)))  // TODO afficher un message d'erreur en alert
    }
}

export function userLogout() {
    return async dispatch => {
        await dispatch(setUserLogout())
        sessionStorage.removeItem('token');
    }
}

// (4) On renvoi la valeur réelle de l'état ('user' est le nom du slice !!)
// on pourra récupéré le contenu du state dans le composant avec un useSelector()
// cela équivaut à const [<<token>>, setToken] = useState(null)
export const selectUser = state => state.user

