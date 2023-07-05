import axios from 'axios';

let BASE_URL;

if (process.env.NODE_ENV === "production") {
	BASE_URL = process.env.REACT_APP_PROD_API_URL
} else {
	BASE_URL = process.env.REACT_APP_DEV_API_URL
}

export const publicRequest = axios.create({
	baseURL: BASE_URL
})

export const userRequest = (token) => axios.create({
	baseURL: BASE_URL,
	headers: { token : `Bearer ${token}`}
})