
import {
	LOGIN,
	LOGOUT,

} from '../action-types/action.types';




var bcrypt = require('bcryptjs');



export const login = (payload, id, onError, onSuccess,) => {
	return (dispatch, getState) => {
		const registerUser = getState().registerUser.registerUser
		//var getHashPassword = bcrypt.hashSync(payload.password, salt);
		const getRegisterUserPass = registerUser.find(user => user.email === payload.email).password
		const comparePassword = bcrypt.compareSync(payload.password, getRegisterUserPass);
		//console.log(getRegisterUserPass)
		//console.log(comparePassword)
		if (registerUser && registerUser.find(({ email }) => email === payload.email) && comparePassword) {
			id = registerUser.find(({ email }) => email === payload.email).id
			dispatch({
				type: LOGIN,
				payload,
				id
			})
		}
		else {
			onError && onError({ password: "Invalid user details" });
			//console.log("Error")
		}

	};
};

export const logout = (payload, onSuccess, onError) => {
	return (dispatch) => {
		dispatch({
			type: LOGOUT,
			payload,
		})
	}


};