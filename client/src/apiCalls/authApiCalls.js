import { publicRequest, userRequest } from './baseApiCall';

export const loginRequest = async (user) => {
	try {
		const response = await publicRequest.post("/auth/login", user);
		return response.data
	} catch(error) {
		throw new Error("Login Error", { cause : error })
	}
}

export const requestPasswordReset = async (data) => {
	try {
		const response = await publicRequest.post("/auth/password/reset/request", data);
		return response.data
	} catch (error) {
		throw new Error("Password Reset Request Error", { cause: error })
	}
}

export const resetPassword = async (token, data) => {
	try {
		const response = await userRequest(token).post("/auth/password/reset", data);
		return response.data
	} catch (error) {
		throw new Error("Password reset error", { cause: error });
	}
}

export const validateToken = async (token) => {
	try {
		const response = await userRequest(token).get("/auth");
		return response.data;
	} catch(error) {
		throw new Error("Token is invalid", { cause: error });
	}
}