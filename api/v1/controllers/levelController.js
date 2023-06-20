const LevelService = require("../services/levelService");

const createLevel = async(req, res) => {
	try {
		let data;
		if (req.body.name && req.body.savings) {
			data = {
				name: req.body.name,
				savings: req.body.savings,
			}
		} else {
			throw {
				status: 400,
				message: "Ensure name and amount fields are filled"
			}
		}
		let level = await LevelService.createLevel(data);
		return res.json({status: 'OK', data: level })
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json({ status: 'FAILED', data: { error: error?.message || error } })
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
		return res.json({status: 'OK', data: level});
	}catch(error) {
		return res
			.status(error?.status || 500)
			.json({ status: 'FAILED', data: { error: error?.message || error }})
	}
} 

const getAllLevels = async (req, res) => {
	try {
		const levels = await LevelService.getAllLevels();
		return res.json({status: 'OK', data: levels});
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json({status: 'FAILED', data: { error: error?.message || error} })
	}
}

const updateLevel = async (req, res) => {
	try {
		const levelId = req.params.id;
		const data = req.body
		const updatedLevel = await LevelService.updateLevel(levelId, data);
		return res.json({status: 'OK', data: updatedLevel })
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json({ status: 'FAILED', data: { error: error?.message || error }})
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
			.json({ status: 'FAILED', data: { error: error?.message || error }})
	}
}

module.exports = {
	createLevel,
	getOneLevel,
	getAllLevels,
	updateLevel,
	deleteOneLevel,
}