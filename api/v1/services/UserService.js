const dotenv = require("dotenv");

const User = require("../database/User");
const LevelService = require("./LevelService");
const HashHelper = require("../helpers/HashHelper")
const SMSHelper = require("../helpers/SMSHelper")

dotenv.config();
const USER_DETAIL_FIELDS = ['name', 'phone', 'email', 'isAdmin','isSuperAdmin'];
const MAX_REFERRAL_LEVEL_RANK = Number(process.env.MAX_REFERRAL_LEVEL_RANK);
const MIN_REFERRALS_TO_ELEVATE_RANK = Number(process.env.MIN_REFERRALS_TO_ELEVATE_RANK);

const createNewUser = async (data) => {
	try {
		let userData = {}
		for (key in data) {
			if (key !== "password" && USER_DETAIL_FIELDS.indexOf(key) != -1) {
				userData[key] = data[key];
			}
		}
		userData.password = HashHelper.hash(data.password);
		let newUser = await User.createNewUser(userData);
		return newUser;
	} catch (error) {
		throw error
	}
}

const getOneUser = async (userId) => {
	try {
		const user = await User.getOneUser(userId);
		return user;
	} catch(error) {
		throw error
	}
}

const searchUser = async (searchParams) => {
	try {
		let user;
		if (searchParams.email) {
			user = await User.searchUser({email: searchParams.email})
		} else if (searchParams.phone) {
			user = await User.searchUser({phone: searchParams.phone});
		} else if (searchParams.name) {
			user = await User.searchUser({name: searchParams.name});
		} 
		if (!user) {
			throw {
				status: 400,
				message: "User not found! Please define a new search query"
			}
		}
		return user;
	} catch(error) {
		throw error;
	}
}

const getAllUsers = async (filterParams) => {
	try {
		let users;
		if (filterParams.level) {
			users = await User.getAllUsers({ level: filterParams.level });
		} else if (filterParams.referred_by) {
			users = await User.getAllUsers({ referred_by: filterParams.referred_by });
		} else {
			users = await User.getAllUsers();
		}
		if (filterParams.page) {
			let indx = Number(filterParams.page);
			if (indx < users.length && (indx + 10) < users.length) {
				users = users.slice(indx,  indx + 10)	
			} else if (indx < users.length) {
				users = users.slice(indx, users.length - 1);
			} else {
				users = users.slice(users.length - 11, users.length - 1);
			}
		}
		if (filterParams.length) {
			users = users.slice(0, length);
		}
		if (filterParams.sort) {
			if (filterParams.sort == "-createdAt") {
				users = users.sort((a, b) => 
					b.createdAt - a.createdAt
				)
			} 
			if (filterParams.sort == "-updatedAt") {
				users = users.sort((a, b) => 
					b.updatedAt - a.updatedAt
				)
			}
			if (filterParams.sort == "-commissionDue") {
				users = users.sort((a, b) => 
					b.commissionDue - a.commissionDue
				)
			}
		}
		return users;
	} catch (error) {
		throw error
	}
}

const updateUserDetails = async (userId, changes) => {
	try {
		let usrChanges = {};
		for (key in changes) {
			if (key === "password") {
				usrChanges.password = HashHelper.hash(changes[key]);
			} else if (USER_DETAIL_FIELDS.indexOf(key) !== -1) {
				usrChanges[key] = changes[key];
			}
		}
		const updatedUser = await User.updateUser(userId, usrChanges);
		return updatedUser;
	} catch (error) {
		throw error;
	}
}

const updateUserIncreaseLevel = async (user) => {
	try {
		let updatedUser, nextLevel;
		if (user.nextLevelRank <= MAX_REFERRAL_LEVEL_RANK) {
			if (user.referrals_made.length >= user.nextLevelRank * MIN_REFERRALS_TO_ELEVATE_RANK) {
				nextLevel = await LevelService.getLevelByRank(user.nextLevelRank);
				updatedUser = await User.updateUser(user._id, {level: nextLevel._id});
				SMSHelper.sendLevelUpdateMsg(updatedUser, nextLevel);
			}
			updatedUser = await User.updateUser(updatedUser._id, {nextLevelRank: nextLevel.rank + 1});
		}
		if (user.referred_by !== null) {
			let referrer = await User.getOneUser(user.referred_by);
			await updateUserIncreaseLevel(referrer);
		}
	} catch(error) {
		throw error;
	}
}

const updateUserAddReferral = async (referrerId, referredId) => {
	try {
		let referrer = await User.updateUser(referrerId, {referrals_made: referredId});
		let referred = await User.updateUser(referredId, {referred_by: referrerId});
		if (referrer.referrals_made.length >= referrer.nextLevelRank * MIN_REFERRALS_TO_ELEVATE_RANK) {
			await updateUserIncreaseLevel(referrer);
		}
		return [ referrer, referred ];
	} catch(error) {
		throw error;
	}
}

const updateUserCommissionDue = async (userId, amount, reset) => {
	try {
		let user;
		if (reset) {
			commissionDue = await User.getOneUser(userId).commissionDue;
			user = await User.updateUser(userId, {commissionDue: 0});
			SMSHelper.sendCommissionPaidMsg(user, commissionDue);
		} else {
			user = await User.getOneUser(userId);
			user = await User.updateUser(userId, { commissionDue: amount + user.commissionDue });
			SMSHelper.sendCommissionEarnedMsg(user, amount);
		}
		return true;
	} catch(error) {
		throw error;
	}
}

const deleteUser = async (userId) => {
	try {
		await User.deleteUser(userId);
	} catch (error) {
		throw error
	}
}

module.exports = {
	createNewUser,
	getOneUser,
	searchUser,
	getAllUsers,
	updateUserAddReferral,
	updateUserCommissionDue,
	updateUserDetails,
	updateUserIncreaseLevel,
	deleteUser,
}