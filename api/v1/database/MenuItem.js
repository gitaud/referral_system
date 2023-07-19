const Item = require("./models/MenuItem.Model");

const createMenuItem = async (data) => {
	try {
		const item = new Item(data);
		await item.save();
		return item;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getOneMenuItem = async (id) => {
	try {
		const item = await Item.findById(id);
		if (!item) {
			throw {
				status: 400,
				message: `No item with the id ${id} found`
			}
		}
		return item;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getAllMenuItems = async (filterParams) => {
	try {
		const items = await Item.find(filterParams);
		if (!items.length) {
			throw {
				status: 400,
				message: "No items found"
			}
		}
		return items;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const updateMenuItem = async (id, data) => {
	try {
		let item = await Item.findById(id);
		if (!item) {
			throw {
				status: 400,
				message: `No item with the id ${id} found`
			}
		}
		for (let key in data) {
			item[key] = data[key]
		}
		await item.save();
		return item;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const deleteOneMenuItem = async (id) => {
	try {
		await Item.findByIdAndDelete(id);
		return true;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const deleteManyMenuItems = async (params) => {
	try {
		await Item.deleteMany(params);
		return true;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

module.exports = {
	createMenuItem,
	getOneMenuItem,
	getAllMenuItems,
	updateMenuItem,
	deleteOneMenuItem,
	deleteManyMenuItems
}