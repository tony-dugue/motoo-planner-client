import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from 'features/user/userSlice';

export function UserLogin() {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(userLogin({ username, password })); // requête à l'API pour se connecter
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-wrapper">
                <label>
                    <p>Votre email</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Votre mot de passe</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Se connecter</button>
                </div>
            </form>
        </div>
    );
}

