import { publicRequest, userRequest } from './baseApiCall';

export const loginRequest = async (user) => {
	try {
		const response = await publicRequest.post("/auth/login", user);
		return response.data
	} catch(error) {
		return error.response?.data || "Failed";
	}
}

export const requestPasswordReset = async (data) => {
	try {
		const response = await publicRequest.post("/auth/password/reset/request", data);
		return response.data;
	} catch(error) {
		return error.response?.data || "Failed";
	}
}

export const resetPassword = async (data, token) => {
	try {
		const response = await userRequest(token).post("/auth/password/reset", data)
		return response.data;
	} catch (error) {
		return error.response?.data || "Failed";
	}
}