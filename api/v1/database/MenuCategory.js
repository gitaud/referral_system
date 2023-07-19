const Category = require("./models/MenuCategory.Model");

const createMenuCategory = async (data) => {
	try {
		const category = new Category(data);
		await category.save();
		return category;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getOneMenuCategory = async (id) => {
	try {
		const category = await Category.findOne({_id: id}).populate('items').exec();
		if (!category) {
			throw {
				status: 400,
				message: `No category with the id ${id} found`
			}
		}
		return category;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getAllMenuCategories = async (filterParams) => {
	try {
		const categories = await Category.find(filterParams).populate('items').exec();
		if (!categories.length) {
			throw {
				status: 400,
				message: "No categories found"
			}
		}
		return categories;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const updateMenuCategoryDetails = async (id, data) => {
	try {
		let category = await Category.findById(id);
		if (!category) {
			throw {
				status: 400,
				message: `No menu category with the id ${id} found`
			}
		}
		for (let key in data) {
			category[key] = data[key];
		}
		await category.save();
		return category;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const updateMenuCategoryAddItems = async (id, itemIds) => {
	try {
		let category = await Category.findById(id);
		if (!category) {
			throw {
				status: 400,
				message: `No menu category with the id ${id} found`
			}
		}
		for (let indx = 0; indx <= itemIds.length; indx++) {
			if (category.items.indexOf(itemIds[indx]) === -1) {
				category.items.push(itemIds[indx]);
			}
		}
		await category.save();
		return category;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const updateMenuCategoryDeleteItem = async (id, itemId) => {
	try {
		let category = await Category.findById(id);
		if (!category) {
			throw {
				status: 400,
				message: `No category with the id ${id} found`
			}
		}
		let items = category.items.filter(item => item !== itemId);
		category.items = [...items];
		await category.save();
		return category;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const deleteMenuCategory = async (id) => {
	try {
		await Category.findByIdAndDelete(id);
		return true;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

module.exports = {
	createMenuCategory,
	getOneMenuCategory,
	getAllMenuCategories,
	updateMenuCategoryDetails,
	updateMenuCategoryAddItems,
	updateMenuCategoryDeleteItem,
	deleteMenuCategory
}