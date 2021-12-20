import { REGISTRATION } from "../action-types/action.types";


export const RegisterUser = (payload, onSuccess, onError) => {

    return (dispatch, getState) => {
        const registerUser = getState().registerUser.registerUser
        const userExist = registerUser.some(({ email }) => email === payload.email)
        if (!userExist) {
            dispatch({
                type: REGISTRATION,
                payload
            });
            onSuccess && onSuccess({ success: `You have successfully register. Please go to login page` })
        } else {
            onError && onError({ email: "Email ID already exit. Please use another email ID " });
        }
    }
}


