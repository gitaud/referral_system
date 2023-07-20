import { userRequest } from "./baseApiCall";

const createNewCategory = async (token, data) => {
	try {
		const response = await userRequest(token).post("/menu/categories", data);
		return response.data;
	} catch (error) {
		throw new Error("Could not create category", { cause: error })
	}
}

const createNewMenuItem = async (token, categoryId, data) => {
	try {
		const response = await userRequest(token).post(`/menu/items/${categoryId}`, data);
		return response.data;
	} catch(error) {
		throw new Error("Could not create menu item", { cause: error })
	}
}

const getMenuCategory = async (token, id) => {
	try {
		const response = await userRequest(token).get(`/menu/categories/${id}`);
		return response.data;
	} catch (error) {
		throw new Error("Could not get category", { cause: error })
	}
}

const getAllMenuCategories = async (token, filterParams) => {
	try {
		const response = await userRequest(token).get(`/menu/categories?${filterParams}`);
		return response.data
	} catch(error) {
		throw new Error("Could not fetch categories", { cause: error });
	}
}

const updateMenuCategoryDetails = async (token, categoryId, data) => {
	try {
		const response = await userRequest(token).patch(`/menu/categories/${categoryId}`, data);
		return response.data;
	} catch(error) {
		throw new Error("Could not update menu category", { cause: error })
	}
}

const updateMenuItem = async (token, itemId, data) => {
	try {
		const response = await userRequest(token).patch(`/menu/items/${itemId}`, data);
		return response.data;
	} catch(error) {
		throw new Error("Could not create menu item", { cause: error })
	}
}

const deleteMenuCategory = async (token, categoryId) => {
	try {
		const response = await userRequest(token).delete(`/menu/categories/${categoryId}`);
		return response.data;
	} catch (error) {
		throw new Error("Could not delete menu category", { cause: error })
	}
}

const deleteMenuItem = async (token, itemId) => {
	try {
		const response = await userRequest(token).delete(`/menu/items/${itemId}`);
		return response.data; 
	} catch(error) {
		throw new Error("Could not delete item", { cause: error })
	}
}

export {
	createNewCategory,
	createNewMenuItem,
	getMenuCategory,
	getAllMenuCategories,
	updateMenuCategoryDetails,
	updateMenuItem,
	deleteMenuCategory,
	deleteMenuItem
}