const Level = require("../database/Level");

const createLevel = async (data) => {
	try {
		let name = String(data.name);
		let savings = Number(data.savings);
		const newLevel = await Level.createLevel({name: name, savings: savings});
		return newLevel;
	} catch(error) {
		throw error;
	}
}

const getOneLevel = async (levelId) => {
	try {
		const level = await Level.getOneLevel(levelId);
		return level;
	} catch(error) {
		throw error;
	}
}

const getAllLevels = async () => {
	try {
		const levels = await Level.getAllLevels();
		return levels;
	} catch(error) {
		throw error;
	}
}

const updateLevel = async (levelId, changes) => {
	try {
		if (!changes.name && !changes.savings) {
			throw {
				status: 400,
				message: "Fields must be populated"
			}
		}
		const updatedLevel = await Level.updateLevel(levelId, changes);
		return updatedLevel;
	} catch(error) {
		throw error;
	}
}

const deleteOneLevel = async (levelId) => {
	try {
		await Level.deleteOneLevel(levelId);
	} catch(error) {
		throw error;
	}
}

module.exports = {
	createLevel,
	getOneLevel,
	getAllLevels,
	updateLevel,
	deleteOneLevel,
}