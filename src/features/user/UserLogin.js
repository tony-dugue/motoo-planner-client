import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { userLogin } from 'features/user/userSlice';

export function UserLogin() {

    const dispatch = useDispatch()
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(userLogin({ username, password })); // requête à l'API pour se connecter
        history.push('/dashboard');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-wrapper">
                <label>
                    <p>Votre email</p>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Votre mot de passe</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Se connecter</button>
                </div>
            </form>
        </div>
    );
}

