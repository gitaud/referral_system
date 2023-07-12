import React, { createContext, useContext, useReducer }  from 'react';

const UserContext = createContext(null);
// Actions

const INITIALIZE = 'INITIALIZE';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

// Action Creators

export const initialize = () => {
	return { type: INITIALIZE }
}

export const success = (data) => {
	return { type: SUCCESS, data }
}

export const failure = (error) => {
	return { type: FAILURE, error }
}

const initialValues = {
	user: null,
	error: null
}

export const userContextReducer = (state, action) => {
	switch(action.type) {
		case INITIALIZE:
			return initialValues;
		case SUCCESS:
			return { user: action.data, error: null };
		case FAILURE:
			return { user: null, error: action.error };
		default:
			return state;
	}
}

export const UserContextProvider = (props) => {
	const [ user, dispatch ] = useReducer(userContextReducer, initialValues);

	return(<UserContext.Provider value={{ user, dispatch }} {...props} />)
}

export const useUserContext = () => {
	return useContext(UserContext);
}