const LevelService = require("../services/LevelService");

const createLevel = async(req, res) => {
	try {
		let data;
		if (req.body.name && req.body.savings && req.body.rank) {
			data = {
				name: req.body.name,
				savings: req.body.savings,
				rank: req.body.rank
			}
		} else {
			throw {
				status: 400,
				message: "Ensure name and amount fields are filled"
			}
		}
		let level = await LevelService.createLevel(data);
		return res.json(level)
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const getOneLevel = async (req, res) => {
	try {
		const levelId = req.params.id;
		if (!levelId) {
			throw {
				status: 400,
				message: `Error! Level id not entered`
			}
		}
		const level = await LevelService.getOneLevel(req.params.id);
		return res.json(level);
	}catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
} 

const getAllLevels = async (req, res) => {
	try {
		const levels = await LevelService.getAllLevels();
		return res.json(levels);
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const updateLevel = async (req, res) => {
	try {
		const levelId = req.params.id;
		const data = req.body
		const updatedLevel = await LevelService.updateLevel(levelId, data);
		return res.json(updatedLevel)
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const deleteOneLevel = async (req, res) => {
	try {
		let levelId = req.params.id;
		await LevelService.deleteOneLevel(levelId);
		return res.json({status: 'OK'});
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

module.exports = {
	createLevel,
	getOneLevel,
	getAllLevels,
	updateLevel,
	deleteOneLevel,
}