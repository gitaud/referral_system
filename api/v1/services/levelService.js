const Level = require("../database/Level");
const LEVEL_FIELDS = ['name', 'savings', 'rank'];

const createLevel = async (data) => {
	try {
		let levelData = {}
		for (key in data) {
			if (LEVEL_FIELDS.indexOf(key) !== -1) {
				levelData[key] = data[key];
			}
		}
		const newLevel = await Level.createLevel(levelData);
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

const getLevelByRank = async (rank) => {
	try {
		if (!rank) {
			throw {
				status: 400,
				message: "Must include a rank"
			}
		}
		const level = await Level.getLevelByRank(rank);
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
	getLevelByRank,
	getAllLevels,
	updateLevel,
	deleteOneLevel,
}