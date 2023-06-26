const userService = require("../services/userService");

const createNewUser = async (req, res) => {
	try {
		const user = await userService.createNewUser(req.body);
		return res.json({ status: 'OK', data: user })
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json({ status: 'FAILED', data: { error: error?.message || error } })
	}
};

const getOneUser = async (req, res) => {
	const userId = req.params.id;
	try {
		if (!userId) {
			throw {
				status: 400,
				message: "User ID must be input"
			}
		}
		const user = await userService.getOneUser(userId);
		return res.json({status: 'OK', data: user});
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json({ status: 'FAILED', data: { error: error?.message || error } })
	}
};

const searchUser = async (req, res) => {
	const { email, phone, name } = req.query;
	try {
		if (!email && !phone && !name) {
			throw {
				status: 400,
				message: "Search parameter must be phone, email or name"
			}
		}
		const user = await userService.searchUser({email, phone, name});
		return res.json({ status: 'OK', data: user });
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json({ status: 'FAILED', data: { error: error?.message || error } })
	}
}

const getAllUsers = async (req, res) => {
	const { level, referred_by, length, page, sort } = req.query;
	try {
		const users = await userService.getAllUsers({level, referred_by, length, page, sort});
		return res.json({status: 'OK', data: users})
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json({status: 'FAILED', data: { error: error?.message || error }})
	}
};

const updateUser = async (req, res) => {
	try {
		const userId = req.params.id;
		if (!userId) {
			throw {
				status: 400,
				message: "User id not provided"
			}
		}
		const updatedUser = await userService.updateUserDetails(userId, req.body);
		return res.json({ status: 'OK', data: updatedUser });
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json({ status: 'FAILED', data: { error: error?.message || error } })
	}
};

const updateUserAddReferral = async (req, res) => {
	try {
		const referrerId = req.params.id;
		const referralId = req.body.referralId;
		if (!referrerId) {
			throw {
				status: 400,
				message: "Referrer id not provided"
			}
		}
		if (!referralId) {
			throw {
				status: 400,
				message: "Referred person's id must be provided"
			}
		}
		let results = await userService.updateUserAddReferral(referrerId, referralId);
		return res.json({status: 'OK', data: results });
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json({status: 'FAILED', data: { error: error?.message || error }});
	}
}

const updateUserIncreaseLevel = async (req, res) => {
	try {
		const userId = req.params.id;
		if (!userId) {
			throw {
				status: 400,
				message: "No user id provided"
			}
		}
		let user = await userService.getOneUser(userId);
		await userService.updateUserIncreaseLevel(user);
		const updatedUser = await userService.getOneUser(userId);
		return res
			.json({ status: 'OK', data: updatedUser });
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json({status: 'FAILED', data: {error: error?.message || error }})
	}
}

const deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		await userService.deleteUser(userId);
		return res.json({status: 'OK'});
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json({ status: 'FAILED', data: { error: error?.message || error } })
	}
};

module.exports = {
	createNewUser,
	getOneUser,
	searchUser,
	getAllUsers,
	updateUser,
	updateUserAddReferral,
	updateUserIncreaseLevel,
	deleteUser,
}