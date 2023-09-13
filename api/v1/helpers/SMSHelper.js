const dotenv = require('dotenv');
dotenv.config();

const { Infobip, AuthType } = require('@infobip-api/sdk');

const infobipClient = new Infobip({
	baseUrl: process.env.INFOBIP_API_BASE_URL,
	apiKey: process.env.INFOBIP_API_KEY,
	authType: AuthType.ApiKey,
});

const sendSMS = async (clientPhoneNo, message) => {
	try {
		await infobipClient.channels.sms.send({
			type: 'text',
			messages: [{
				destinations: [
					{
						to: clientPhoneNo,
					},
				],
				from: 'KIJANAMSAFI',
				text: message,
			}],
		});
	} catch (error) {
		console.error(error);
	}
}

const sendLevelUpdateMsg = (user, level ) => {
	const msg = `Dear ${user.name}, Congratulations! Your earnings level has been increased to ${level.name}. You will earn ${level.savings} points for every Ksh 100 spent. Regards, Kijana Msafi Hotel`;
	sendSMS(user.phone, msg);
}

const sendCommissionPaidMsg = (userName, userPhone, pointsEarned, pointsRedeemed, newBalance) => {
	const msg = `Dear ${userName} you have earned ${pointsEarned} points and redeemed ${pointsRedeemed} points. Your new balance is ${newBalance} points. Regards, Kijana Msafi Hotel.`
	sendSMS(userPhone, msg);
}

const sendCommissionEarnedMsg = (userName, userPhone, pointsEarned, totalPoints) => {
	const msg = `Dear ${userName} you have earned ${pointsEarned} points. Your new balance is ${totalPoints} points. Regards, Kijana Msafi Hotel.`
	sendSMS(userPhone, msg);
}

module.exports = { 
	sendLevelUpdateMsg,
	sendCommissionPaidMsg,
	sendCommissionEarnedMsg
}