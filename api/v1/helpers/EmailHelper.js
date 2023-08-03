const dotenv =require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: '0Auth2',
		user: process.env.DEV_EMAIL,
		pass: process.env.DEV_EMAIL_PASSWORD,
		clientId: process.env.OAUTH_CLIENT_ID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN
	}
})

const send = (phrase) => {
	transporter.sendMail(phrase, status, (err, data) => {
		if (err) {
			console.log(err);
			status = 'failed'
		}  else {
			console.log('Email sent!')
			status = 'ok'
		}
	})
}

const sendPasswordResetToken = (user, token) => {
	const message = `Dear ${user.name} reset your password here ${process.env.FRONTEND_DOMAIN}/reset/${token}`;
	send(message);
}

module.exports = {
	send,
	sendPasswordResetToken
}