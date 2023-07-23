const UserService = require("./UserService");

const HashHelper = require("../helpers/HashHelper");
const EmailHelper = require("../helpers/EmailHelper");
const TokenHelper = require("../helpers/TokenHelper");

const login = async (data) => {
	try {
		const user = await UserService.searchUser({email: data.email });
		if (!user) {
			throw {
				status: 400,
				message: `No user with the email ${data.email} found`
			}
		}
		let usrPassword = HashHelper.unhash(user.password);
		if (usrPassword !== data.password) {
			throw {
				status: 400,
				message: 'Wrong credentials provided'
			}
		}
		const token = TokenHelper.createToken(user, '365d');
		const { password, referrals_made, referred_by, commissionDue, nextLevelRank, ...otherData } = user._doc;
		return { ...otherData, token }
	} catch(error) {
		throw error;
	}
}

const handlePasswordResetRequest = async (email) => {
	try {
		const user = await UserService.searchUser({ email });
		const token = TokenHelper.createToken(user, '4h');
		EmailHelper.sendPasswordResetToken(user, token);
	} catch(error) {
		throw error;
	}
}

const resetPassword = async (userId, password) => {
	try {
		const user = await UserService.updateUserDetails(userId, { password: password });
		return user;
	} catch (error) {
		throw error;
	}
}


module.exports = {
	login,
	handlePasswordResetRequest,
	resetPassword,
}