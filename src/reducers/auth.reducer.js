import { LOGIN, LOGOUT } from '../action-types/action.types';

// import isEmpty from 'lodash/isEmpty';

const initialStates = {
	isloggedin: false,
	email: '',
	id: '',
	errorMsg: '',
	//auth_token: '',
	//userData: {},
};

const auth = (state = initialStates, action) => {
	switch (action.type) {
		case LOGIN:
			//	console.log(action.payload)
			return {
				...state,
				isloggedin: true,
				//auth_token: action.payload.auth_token,
				//userData: action.payload,			
				email: action.payload.email,
				id: action.id
			};
		case LOGOUT:
			return {
				state: undefined,
			};
		default:
			return state;
	}
};

export default auth;
