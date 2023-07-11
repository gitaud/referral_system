import { userRequest } from './baseApiCall';

export const createLevel = async (token, data) = {
	try {
		const response = await userRequest(token).post("/levels", data);
		return response.data;
	} catch(error) {
		throw new Error("Failed to create level", { cause: error });
	}
}

export const getOneLevel = async (token, id) => {
	try {
		const response = await userRequest(token).get(`/levels/${id}`);
		return response.data;
	} catch (error) {
		throw new Error("Failed to fetch level", { cause: error });
	}
}

export const getAllLevels = async (token) => {
	try {
		const response = await userRequest(token).get("/levels");
		return response.data;
	} catch (error) {
		throw new Error("Failed to fetch levels", { cause: error });
	}
}

export const updateLevel = async (token, id, data) => {
	try {
		const response = await userRequest(token).patch(`/levels/${id}`, data);
		return response.data;
	} catch(error) {
		throw new Error("Failed to update level", { cause: error });
	}
}

export const deleteLevel = async (token, id) => {
	try {
		const response = await userRequest(token).delete(`/levels/${id}`);
		return response.data;
	} catch (error) {
		throw new Error("", { cause: error });
	}
}