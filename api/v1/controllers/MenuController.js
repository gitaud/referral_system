const MenuService = require("../services/MenuService");

const createCategory = async (req, res) => {
	try {
		const name = req.body.name;
		if (!name) {
			throw {
				status: 400,
				message: 'Name field required!'
			}
		}
		const category = await MenuService.createNewCategory(name);
		return res.json(category);
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const createMenuItem = async (req, res) => {
	try {
		const categoryId = req.body.category;
		if (!categoryId) {
			throw {
				status: 400,
				message: "Select category first"
			}
		}
		if (!req.body.name || !req.body.price) {
			throw {
				status: 400,
				message: `Name and price values must be added`
			}
		}
		const data = {
			name: req.body.name,
			price: req.body.price
		}
		const updatedCategory = await MenuService.createNewMenuItem(categoryId, data);
		return res.json(updatedCategory);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const getMenuCategory = async (req, res) => {
	try {
		const categoryId = req.params.id;
		if (!categoryId) {
			throw {
				status: 400,
				message: "Select category first"
			}
		}
		const category = await MenuService.getMenuCategory(categoryId);
		return res.json(category);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const getAllMenuCategories = async (req, res) => {
	try {
		const filterParams = req.query;
		let categories;
		if (filterParams) {
			categories = await MenuService.getAllMenuCategories(filterParams);
		} else {
			categories = await MenuService.getAllMenuCategories({});
		}
		return res.json(categories);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const updateMenuCategoryDetails = async (req, res) => {
	try {
		const categoryId = req.params.id;
		if (!categoryId) {
			throw {
				status: 400,
				message: "Select category first!"
			}
		}
		if (!req.body.name) {
			throw {
				status: 400,
				message: "Input Fields are required!"
			}
		}
		const updatedCategory = await MenuService.updateMenuCategoryDetails(categoryId, { name: req.body.name });
		return res.json(updatedCategory);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const updateMenuItem = async (req, res) => {
	try {
		const itemId = req.params.id;
		if (!itemId) {
			throw {
				status: 400,
				message: 'Item id required!'
			}
		}
		if (!req.body.name && !req.body.price) {
			throw {
				status: 400,
				message: "Ensure name and price fields are filled"
			}
		}
		const updatedItem = await MenuService.updateMenuItem(itemId, { name: req.body.name, price: req.body.price });
		return res.json(updatedItem);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const deleteMenuItem = async (req, res) => {
	try {
		const itemId = req.params.id;
		if (!itemId) {
			throw {
				status: 400,
				message: "Select an item to delete"
			}
		}
		const deleted = await MenuService.deleteMenuItem(itemId);
		return res.json({ status: "OK", deleted: deleted });
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const deleteMenuCategory = async (req, res) => {
	try {
		const categoryId = req.params.id;
		if (!categoryId) {
			throw {
				status: 400,
				message: "Select a category to delete"
			}
		}
		const deleted = await MenuService.deleteCategoryItem(categoryId);
		return res.json({ status: "OK", deleted: deleted});
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

module.exports = {
	createCategory,
	createMenuItem,
	getMenuCategory,
	getAllMenuCategories,
	updateMenuCategoryDetails,
	updateMenuItem,
	deleteMenuItem,
	deleteMenuCategory
}