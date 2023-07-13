import { userRequest } from './baseApiCall';

export const createTransaction = async (token, data) => {
	try {
		const response = await userRequest(token).post("/transactions/", data);
		return response.data;
	} catch(error) {
		throw new Error("Could not create transaction", { cause: error });
	}
}

export const getOneTransaction = async (token, id) => {
	try {
		const response = await userRequest(token).get(`/transactions/${id}`)
		return response.data;
	} catch(error) {
		throw new Error("Could not fetch transaction", { cause: error })
	}
}

export const getAllTransactions = async (token, filterParams) => {
	try {
		const response = await userRequest(token).get(`/transactions?${filterParams}`)
		return response.data;
	} catch(error) {
		throw new Error("Could not fetch transactions", { cause: error })
	}
}