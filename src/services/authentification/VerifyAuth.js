import React from 'react';
import { Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import { selectUser } from 'features/user/userSlice';

export const VerifyAuth = ({ children }) => {

    const tokenStorage = localStorage.getItem('token');
    const { token } = useSelector(selectUser); // on récupère le state

    return (tokenStorage || token) ? children : <Redirect to={"/login"} />;
}

