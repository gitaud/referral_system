const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const hash = (phrase) => {
	return CryptoJS.AES.encrypt(phrase, process.env.SECRET_PASSPHRASE).toString();
}

module.exports = {
	hash
}