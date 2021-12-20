import { REGISTRATION, ADD_USER } from "../action-types/action.types";

const initialStates = {
    registerUser: [],

};

const registerUser = (state = initialStates, action) => {
    switch (action.type) {
        case REGISTRATION:

            const newUser = action.payload
            // console.log(newUser)           
            return {
                ...state,
                registerUser: [...state.registerUser, newUser],

            };
        case ADD_USER:
            const newAdminUser = action.payload
            // console.log(newAdminUser)
            return {
                ...state,
                registerUser: [...state.registerUser, newAdminUser]
            };

        default:
            return state;
    }
};

export default registerUser;