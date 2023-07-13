import React, { createContext, useContext, useReducer } from 'react';

export const DateFilterContext = createContext(null);

const initialValues = {
	date_lte: null,
	date_gte: null,
}

// Action Types
export const INITIALIZE = 'INITIALIZE';
export const SET_DATES = 'SET_DATES';

// Action creators
export const initialize = () => {
	return { type: INITIALIZE }
}

export const setDates = (data ) => {
	return { type: SET_DATES, data }
}


export const dateReducer = (state, action) => {
	switch (action.type) {
		case INITIALIZE:
			return initialValues;
		case SET_DATES:
			return { date_lte: action.data.date_lte, date_gte: action.data.date_gte };
		default:
			return state;
	}
}

export const DateFilterContextProvider = (props) => {
	const [ dates, dispatch] = useReducer(dateReducer, initialValues);

	return (
		<DateFilterContext.Provider value={{ dates, dispatch }} {...props} />
	)
}

export const useDateFilterContext = () => {
	return useContext(DateFilterContext);
}