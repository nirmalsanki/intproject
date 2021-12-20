import { ADD_USER, REMOVE_USER, EDIT_USER } from "../action-types/action.types";


export const addUser = (payload, onSuccess, onError) => {
    return (dispatch, getState) => {
        const registerUser = getState().addUser.addUser
        const userExist = registerUser.some(({ email }) => email === payload.email)
        //console.log(userExist)
        if (!userExist) {
            dispatch({
                type: ADD_USER,
                payload
            })
            onSuccess && onSuccess({ success: "User successfully added" });
        }
        else {
            onError && onError({ email: "Email Id already exit. Please use another email ID " });
        }
    };
};

export const removeUser = (userEmail) => {
    return (dispatch) => {
        // console.log(userEmail)
        dispatch({
            type: REMOVE_USER,
            payload: {
                email: userEmail
            }
        });
    }
};


export const editUserHandler = (payload, onSuccess, onError) => {
    return (dispatch, getState) => {
        const registerUser = getState().addUser.addUser
        const userExist = registerUser.some(({ email }) => email === payload.email)
        // console.log(userExist)
        if (userExist) {
            dispatch({
                type: EDIT_USER,
                payload
            })
            onSuccess && onSuccess({ success: "User successfully updated." });
        }
        else {
            onError && onError({ email: "Email can not be change" });
        }
    };
};