const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();

const hash = (phrase) => {
	return CryptoJS.AES.encrypt(phrase, process.env.SECRET_PASSPHRASE).toString();
}

const unhash = (phrase) => {
	return CryptoJS.AES.decrypt(phrase, process.env.SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
}

module.exports = {
	hash,
	unhash
}