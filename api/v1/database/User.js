const User = require("./models/User.Model");

const createNewUser = async (data) => {
	try {
		const newUser = new User(data);
		await newUser.save()
		return newUser;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getOneUser = async (userId) => {
	try {
		let user = await User.findById(userId).populate('level', 'name _id');
		if (!user) {
			throw {
				status: 400,
				message: `Can't find user with the specified id ${userId}`
			}
		}
		return user;
	} catch(error) {
		throw { status: error?.status || 500, message: error?.message || error }
	}
}

const searchUser = async (searchParams) => {
	try {
		const user = await User.findOne(searchParams).select('id name level nextLevelRank email phone referred_by password referrals_made isAdmin isSuperAdmin').populate('level', 'name _id').exec();
		if (!user) {
			throw {
				status: 400,
				message: "Can't find user with the specified parameters"
			}
		}
		return user;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error }
	}
}

const getAllUsers = async (filterParams, limit) => {
	try {
		let users;
		if (limit) {
			users = await User.find(filterParams).select('_id name email phone level referred_by createdAt updatedAt').populate('level', 'name _id').limit(5).exec();
		} else {
			users = await User.find(filterParams).select('_id name email phone level referred_by createdAt updatedAt').populate('level', 'name _id').exec();
		}
		if (users.length > 0) {
			return users;
		} else {
			throw {
				status: 400,
				message: "No users matching the parameters found"
			}
		}
	} catch(error) {
		throw { status: error?.status || 500, message: error?.message || error}
	}
}

const getUserStats = async (lastYear) => {
	try {
		const data = await User.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 }
				}
			}
		]);
		return data;
	} catch(error) {
		throw { status: error?.status || 500, message: error?.message || error }
	}
}

const updateUser = async (userId, changes) => {
	try {
		let user = await User.findById(userId);
		if (!user) {
			throw {
				status: 400,
				message: `No user with the id ${userId} found`
			}
		}
		if (changes.referrals_made) {
			if (user.referrals_made.indexOf(changes.referrals_made) === -1) {
				user.referrals_made.push(changes.referrals_made);
			}
		} else if (changes.referred_by) {
			if (user.referred_by !== null) {
				throw {
					status: 400,
					message: "User has already been referred"
				}
			}
			user.referred_by = changes.referred_by;
		}
		for (key in changes) {
			if ( key !== "referrals_made" && key !== "referred_by") {
				user[key] = changes[key];
			}
		}
		await user.save();
		let updatedUser = await getOneUser(user._id);
		return updatedUser;
	} catch(error) {
		throw { status: error?.status || 500, message: error?.message || error }
	}
}

const deleteUser = async (userId) => {
	try {
		await User.findByIdAndDelete(userId);
	} catch(error) {
		throw { status: error?.status || 500, message: error?.message || error }
	}
}

module.exports = {
	createNewUser,
	getOneUser,
	searchUser,
	getAllUsers,
	getUserStats,
	updateUser,
	deleteUser,
}