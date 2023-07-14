import { userRequest } from './baseApiCall';

export const createUser = async(token, data) => {
	try {
		const response = await userRequest(token).post("/users", data);
		return response.data;
	} catch(error) {
		throw new Error("Failed to create user", { cause: error })
	}
}

export const getOneUser = async(token, id) => {
	try {
		const response = await userRequest(token).get(`/users/${id}`);
		return response.data;
	} catch(error) {
		throw new Error("Failed to get user", { cause: error })
	}
}

export const getAllUsers = async(token, filterParams) => {
	try {
		const response = await userRequest(token).get(`/users?${filterParams}`)
		return response.data;
	} catch (error) {
		throw new Error("Failed to get all users", { cause: error })
	}
}

export const updateUser = async(token, id, data) => {
	try {
		const response = await userRequest(token).patch(`/users/${id}`, data);
		return response.data;
	} catch (error) {
		throw new Error("Failed to update user", { cause: error })
	}
}

export const searchUser = async(token, searchParams) => {
	try {
		const response = await userRequest(token).get(`/users/search?${searchParams}`);
		return response.data;
	} catch (error) {
		throw new Error("Failed to search user", { cause: error })
	}
}

export const addReferral = async(token, referrerId, referredId) => {
	try {
		const response = await userRequest(token).patch(`/users/referral/add/${referrerId}`, referredId);
		return response.data;
	} catch(error) {
		throw new Error("Failed to add referral", { cause: error });
	}
}

export const getUserStats = async (token) => {
	try {
		const response = await userRequest(token).get("/users/stats");
		return response.data;
	} catch(error) {
		throw new Error("Cannot get user stats", { cause: error });
	}
}

export const updateUserIncreaseLevel = async(token, id) => {
	try {
		const response = await userRequest(token).patch(`/users/level/add/${id}`)
		return response.data;
	} catch(error) {
		throw new Error("Failed to increase user's level", { cause: error });
	}
} 

export const deleteUser = async(token, id) => {
	try {
		const response = await userRequest(token).delete(`/users/${id}`);
		return response.status;
	} catch (error) {
		throw new Error("Failed to delete user", { cause: error })
	}
}