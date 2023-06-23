const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const AuthService = require("../services/authService");

const verifyLogin = (req, res, next) => {
	next();
}

const verifyAdmin = (req, res, next) => {
	next();
}

const verifySuperAdmin = (req, res, next) => {
	next();
}

const verifyAuthorized = (req, res, next) => {
	next();
}

module.exports = {
	verifyLogin,
	verifyAdmin,
	verifySuperAdmin,
	verifyAuthorized,
}