const MenuItem = require("../database/MenuItem");
const MenuCategory = require("../database/MenuCategory");

const createNewCategory = async (name) => {
	try {
		const category = await MenuCategory.createMenuCategory({ name: name });
		return category;
	} catch(error) {
		throw error;
	}
}

const createNewMenuItem = async (categoryId, itemData) => {
	try {
		const item = await MenuItem.createMenuItem({name: itemData.name, price: itemData.price, category: categoryId });
		let category = await MenuCategory.updateMenuCategoryAddItems(categoryId, [item._id]);
		return category;
	} catch(error) {
		throw error;
	}
}

const getMenuCategory = async (categoryId) => {
	try {
		const category = await MenuCategory.getOneMenuCategory(categoryId);
		return category;
	} catch(error) {
		throw error;
	}
}

const getAllMenuCategories = async (filterParams) => {
	try {
		const categories = await MenuCategory.getAllMenuCategories(filterParams);
		return categories;
	} catch(error) {
		throw error;
	}
}

const updateMenuCategoryDetails = async (categoryId, data) => {
	try {
		const category = await MenuCategory.updateMenuCategoryDetails(categoryId, data);
		return category;
	} catch (error) {
		throw error;
	}
}

const updateMenuItem = async (itemId, data) => {
	try {
		const updatedItem = await MenuItem.updateMenuItem(itemId, data);
		return updatedItem;
	} catch(error) {
		throw error;
	}
}

const deleteMenuItem = async (itemId) => {
	try {
		const item = await MenuItem.getOneMenuItem(itemId);
		let itemDeleted = await MenuItem.deleteOneMenuItem(itemId);
		let categoryDeleted = await MenuCategory.updateMenuCategoryDeleteItem(item.category, itemId);
		if (!itemDeleted || !categoryDeleted) {
			throw {
				status: 500,
				message: `Could not delete items`
			}
		}
		return true;
	} catch(error)  {
		throw error;
	}
}

const deleteMenuCategory = async (categoryId) => {
	try {
		let categoryDeleted = await MenuCategory.deleteMenuCategory(categoryId);
		let menuItemsDeleted = await MenuItem.deleteManyMenuItems({ category: categoryId });
		if (!categoryDeleted || !menuItemsDeleted ) {
			throw {
				status: 500,
				message: `Could not delete category`
			}
		}
		return true;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createNewCategory,
	createNewMenuItem,
	getMenuCategory,
	getAllMenuCategories,
	updateMenuCategoryDetails,
	updateMenuItem,
	deleteMenuItem,
	deleteMenuCategory
}