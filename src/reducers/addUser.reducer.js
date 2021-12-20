import { ADD_USER, EDIT_USER, REMOVE_USER } from '../action-types/action.types';

// import isEmpty from 'lodash/isEmpty';

const initialStates = {
    addUser: []
};

const addUser = (state = initialStates, action) => {
    switch (action.type) {
        case ADD_USER:
            const newUser = action.payload
            return {
                ...state,
                addUser: [newUser, ...state.addUser]
            };
        case REMOVE_USER:
            // console.log(action.payload.email)
            const removeUser = action.payload.email
            console.log(removeUser)

            return {
                ...state,
                addUser: state.addUser.filter(user => user.email !== removeUser),
            };
        case EDIT_USER:
            // console.log(action.payload.email)


            const index = state.addUser.findIndex(user => user.email === action.payload.email); //finding index of the item

            //making a new array
            const newArray = [...state.addUser];
            newArray[index].name = action.payload.name;
            newArray[index].phone = action.payload.phone;
            newArray[index].address = action.payload.address;
            return {
                ...state,
                addUser: newArray

            };

        default:
            return state;
    }
};

export default addUser;
