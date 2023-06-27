const dotenv =require("dotenv");
dotenv.config();

const send = (phrase) => {
	console.log(phrase);
}

const sendPasswordResetToken = (user, token) => {
	console.log(`Dear ${user.name} reset your password here ${process.env.FRONTEND_DOMAIN}/reset/${token}`);
}

module.exports = {
	send,
	sendPasswordResetToken
}