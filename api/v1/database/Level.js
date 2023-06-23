const Level = require("./models/Level.Model");

const createLevel = async (data) => {
	const exists = await Level.find({name: data.name});
	if (exists[0]) {
		throw {
			status: 400,
			message: `A level with the name ${data.name} already exists!`
		};
	}
	try {
		let newLevel = new Level(data);
		await newLevel.save();
		return newLevel;
	}catch(error) {
		throw { status: 500, message: error?.message || error }
	}
}

const getOneLevel = async (levelId) => {
	try {
		const level = await Level.findById(levelId);
		if (!level) {
			throw {
				status: 400,
				message: `Can't find a level with the id ${levelId}`
			}
		}
		return level;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getAllLevels = async () => {
	try {
		const levels = await Level.find();
		if (!levels || levels.length === 0) {
			throw {
				status: 400,
				message: `No levels found`
			}
		}
		return levels;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getLevelByRank = async (rank) => {
	try {
		const level = await Level.findOne({rank: rank});
		return level
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const updateLevel = async (levelId, changes) => {
	try {
		const level = await Level.findById(levelId);
		if (!level) {
			throw {
				status: 400,
				message: `No level with the id ${levelId} found`
			};
		}
		for (key in changes) {
			level[key] = changes[key];
		}
		await level.save();
		return level;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error }
	}
}

const deleteOneLevel = async (levelId) => {
	try {
		await Level.findByIdAndDelete(levelId);
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

module.exports = {
	createLevel,
	updateLevel,
	getOneLevel,
	getLevelByRank,
	getAllLevels,
	deleteOneLevel,
}