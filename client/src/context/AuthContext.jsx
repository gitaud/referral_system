import React, { createContext, useContext, useReducer } from 'react';
import { validateToken } from '../apiCalls/authApiCalls';

const AuthContext = createContext(null);

const defaultValues = {
  isLoggedIn: false,
  authToken: null,
  name: null,
  error: null
}
let initialValues;

try {
  const data = JSON.parse(localStorage.getItem("USER_STATE"));
  if (!data) {
    throw new Error("No data found");
  }
  let response = await validateToken(data.authToken);
  if (response.status === 'OK') {
    initialValues = data;
  }
} catch(error) {
  initialValues = defaultValues;
}

export const INITIATING_LOGIN = 'INITIATING LOGIN'
export const LOGIN_SUCCESS = 'LOGIN SUCCESS';
export const LOGIN_FAILURE = 'LOGIN FAILURE';
export const LOGOUT = 'LOGOUT';

export const initiateLogin = () => {
  return { type: INITIATING_LOGIN }
}

export const loginSuccess = (data) => {
  return { type: LOGIN_SUCCESS, data }
}

export const loginFailure = (error) => {
  return { type: LOGIN_FAILURE, error }
}

export const logout = () => {
  return { type: LOGOUT }
}

const authReducer = (state, action) => {
  switch(action.type) {
    case INITIATING_LOGIN:
      return defaultValues;
    case LOGIN_SUCCESS:
      let userData = { isLoggedIn: true, authToken: action.data.token, name: action.data.name, error: null};
      localStorage.setItem('USER_STATE', JSON.stringify(userData));
      return userData
    case LOGIN_FAILURE:
      return { isLoggedIn: false, authToken: null, name: null, error: action.error }
    case LOGOUT:
      localStorage.setItem('USER_STATE', JSON.stringify(defaultValues))
      return defaultValues;
    default:
      return state;
  }
}


export const AuthContextProvider = (props) => {

  const [ user, dispatch ] = useReducer(authReducer, initialValues);

  return(
    <AuthContext.Provider value={{ user, dispatch }} {...props} />
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext);
}