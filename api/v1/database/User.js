const mongoose = require("mongoose");
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
		let user = await User.findById(userId);
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
		const user = await User.findOne(searchParams).select('id name level nextLevelRank email phone referred_by password referrals_made');
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

const getAllUsers = async (filterParams) => {
	try {
		let users = await User.find(filterParams).select('_id name email phone level referred_by createdAt updatedAt');
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
		}
		for (key in changes) {
			if ( key !== "referrals_made") {
				user[key] = changes[key];
			}
		}
		await user.save();
		const { password, isSuperAdmin, ...otherData } = user._doc;
		return otherData;
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
	updateUser,
	deleteUser,
}