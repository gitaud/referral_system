const dotenv =require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: process.env.DEV_EMAIL,
		pass: process.env.DEV_EMAIL_PASSWORD,
		clientId: process.env.OAUTH_CLIENT_ID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN
	}
})

const send = (message) => {
	transporter.sendMail(message, (err, data) => {
		if (err) {
			console.log(err);
		}  else {
			console.log('Email sent!')
		}
	})
}

const sendPasswordResetToken = (user, token) => {
	const message = {
		from: process.env.DEV_EMAIL,
		to: user.email,
		subject: 'Password Recovery',
		text: `Dear ${user.name}, reset your password here ${process.env.FRONTEND_DOMAIN}/reset/${token}`,
		html: `<p>Dear ${user.name}, reset your password here ${process.env.FRONTEND_DOMAIN}/reset/${token}</p>`
	}
	send(message);
}

module.exports = {
	send,
	sendPasswordResetToken
}