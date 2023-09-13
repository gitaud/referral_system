const dotenv = require("dotenv");

const User = require("../database/User");
const LevelService = require("./LevelService");
const HashHelper = require("../helpers/HashHelper")
const SMSHelper = require("../helpers/SMSHelper")

dotenv.config();
const USER_DETAIL_FIELDS = ['name', 'phone', 'email', 'isAdmin','isSuperAdmin', 'level'];
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
		let limit = filterParams.limit;
		let users;
		if (filterParams.level) {
			users = await User.getAllUsers({ level: filterParams.level }, limit);
		} else if (filterParams.referred_by) {
			users = await User.getAllUsers({ referred_by: filterParams.referred_by }, limit);
		} else {
			users = await User.getAllUsers(null, limit);
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

const getUserStats = async () => {
	try {
		const date = new Date();
		const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
		const stats = await User.getUserStats(lastYear);
		return stats;
	} catch(error) {
		throw error;
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

const updateUserIncreaseLevel = async (user, underling=false) => {
	try {
		let updatedUser, promoted;
		const nextLevel = await LevelService.getLevelByRank(user.nextLevelRank);
		const referrals_made = user.referrals_made.length;
		if (user.nextLevelRank <= MAX_REFERRAL_LEVEL_RANK) {
			if (underling) {
				user = await User.updateUser(user._id, { nextLevelRank: nextLevel.rank + 1 });
			}
			if (referrals_made !== 0 && referrals_made % (user.nextLevelRank * MIN_REFERRALS_TO_ELEVATE_RANK) === 0) {
				updatedUser = await User.updateUser(user._id, {level: nextLevel._id});
				SMSHelper.sendLevelUpdateMsg(updatedUser, nextLevel);
				updatedUser = await User.updateUser(updatedUser._id, {nextLevelRank: nextLevel.rank + 1});
				promoted = true;
			}
			if (user.referred_by !== null && ( promoted || underling )) {
				let referrer = await User.getOneUser(user.referred_by);
				await updateUserIncreaseLevel(referrer, true);
			}
		}
	} catch(error) {
		throw error;
	}
}

const updateUserAddReferral = async (referrerId, referredId) => {
	try {
		let referred = await User.updateUser(referredId, {referred_by: referrerId});
		let referrer = await User.updateUser(referrerId, {referrals_made: referredId});
		if (referrer.referrals_made.length >= referrer.nextLevelRank * MIN_REFERRALS_TO_ELEVATE_RANK) {
			await updateUserIncreaseLevel(referrer, false);
		}
		return [ referrer, referred ];
	} catch(error) {
		throw error;
	}
}

const updateUserCommissionDue = async (data) => {
	try {
		let user = await User.getOneUser(data.id)
		if (data.redeemed) {
			const newCommission = user.commissionDue - data.pointsRedeemed + data.commission;
			user = await User.updateUser(data.id, {commissionDue: newCommission});
			SMSHelper.sendCommissionPaidMsg(user.name, user.phone, data.commission, data.pointsRedeemed, newCommission);
		} else {
			user = await User.updateUser(data.id, { commissionDue: data.commission + user.commissionDue });
			SMSHelper.sendCommissionEarnedMsg(user.name, user.phone, data.commission, user.commissionDue);
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
	getUserStats,
	updateUserAddReferral,
	updateUserCommissionDue,
	updateUserDetails,
	updateUserIncreaseLevel,
	deleteUser,
}