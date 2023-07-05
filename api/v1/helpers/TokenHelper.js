const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const createToken = (user, timeToExpiry) => {
	try {
		const token = jwt.sign({
			id: user._id,
			isAdmin: user.isAdmin,
			isSuperAdmin: user.isSuperAdmin
		}, process.env.JWT_SECRET, { expiresIn: timeToExpiry });
		return token;
	} catch(error) {
		throw error;
	}
}

const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.headers.token;
		if (!authHeader) {
			throw {
				status: 401,
				message: "Not authorized"
			}
		}
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
			if (error) throw { status: 401, message: "Token not valid" }
			req.user = user;
			next();
		});
	} catch(error) {
		return res
			.status(error?.status || 400)
			.json(error?.message || error);
	}
}

const verifyAdmin = (req, res, next) => {
	try {
		verifyToken(req, res, () => {
			if (!req.user.isAdmin && !req.user.isSuperAdmin) {
				throw {
					status: 403,
					message: "FORBIDDEN"
				}
			}
			next();
		});
	} catch (error) {
		return res
			.status(error?.status || 400)
			.json(error?.message || error);
	}
}

const verifySuperAdmin = (req, res, next) => {
	try {
		verifyToken(req, res, () => {
			if (!req.user.isSuperAdmin) {
				throw {
					status: 403,
					message: "FORBIDDEN"
				}
			}
			next();
		});
	} catch (error) {
		return res
			.status(error?.status || 400)
			.json(error?.message || error);
	}
}

const verifyAuthorized = (req, res, next) => {
	try {
		verifyToken(req, res, async () => {
			if ((req.params.id !== req.user.id) && !req.user.isAdmin && !req.user.isSuperAdmin ) {
				throw {
					status: 403,
					message: "FORBIDDEN"
				}
			}
			next();
		});
	} catch (error) {
		return res
			.status(error?.status || 400)
			.json(error?.message || error);
	}
}

module.exports = {
	createToken,
	verifyToken,
	verifyAdmin,
	verifySuperAdmin,
	verifyAuthorized,
}