import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectAuth, authSuccess } from "features/auth/authSlice";
import { selectUser } from "features/user/userSlice";
import { getUserProfile } from "features/auth/userAction";

import { fetchNewAccessJWT } from "api/userApi";

import { DefaultLayout } from "components/layouts/DefaultLayout";

export const PrivateRoute = ({ children, ...rest }) => {

    const dispatch = useDispatch();

    const { userProfile } = useSelector(selectUser);
    const { isAuth } = useSelector(selectAuth);

    useEffect(() => {
        const updateAccessJWT = async () => {
            const result = await fetchNewAccessJWT();
            result && dispatch(authSuccess());
        };

        !userProfile._id && dispatch(getUserProfile());

        !sessionStorage.getItem("accessJWT") && localStorage.getItem("crmSite") && updateAccessJWT();

        !isAuth && sessionStorage.getItem("accessJWT") && dispatch(authSuccess());
    }, [dispatch, isAuth, userProfile._id]);

    return (
        <Route
            {...rest}
            render={() =>
                isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to="/login" />
            }
        />
    );
};
