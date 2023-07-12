const UserService = require("../services/UserService");

const createNewUser = async (req, res) => {
	try {
		const user = await UserService.createNewUser(req.body);
		return res.json(user)
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
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
		const user = await UserService.getOneUser(userId);
		return res.json(user);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
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
		const user = await UserService.searchUser({email, phone, name});
		return res.json(user);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const getAllUsers = async (req, res) => {
	const { level, referred_by, length, page, sort } = req.query;
	try {
		const users = await UserService.getAllUsers({level, referred_by, length, page, sort});
		return res.json(users)
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
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
		const updatedUser = await UserService.updateUserDetails(userId, req.body);
		return res.json(updatedUser);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
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
		if (referrerId === referralId) {
			throw {
				status: 400,
				message: "A user cannot refer himself"
			}
		}
		let results = await UserService.updateUserAddReferral(referrerId, referralId);
		return res.json(results);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
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
		let user = await UserService.getOneUser(userId);
		await UserService.updateUserIncreaseLevel(user);
		const updatedUser = await UserService.getOneUser(userId);
		return res
			.json(updatedUser);
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		await UserService.deleteUser(userId);
		return res.json({status: 'OK'});
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
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