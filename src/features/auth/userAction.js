import { getLoading, getSuccess, getFailure } from "features/user/userSlice";
import { findUser } from "api/userApi";

export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch(getLoading());

        const result = await findUser();

        if (result.user && result.user._id)
            return dispatch(getSuccess(result.user));

        dispatch(getFailure("User is not found"));
    } catch (error) {
        dispatch(getFailure(error));
    }
};
