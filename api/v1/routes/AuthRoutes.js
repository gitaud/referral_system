const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const TokenHelper = require("../helpers/TokenHelper");

router.post("/login", AuthController.login);

router.post("/password/reset/request", AuthController.handlePasswordResetRequest);

router.post("/password/reset", TokenHelper.verifyToken, AuthController.resetPassword);

module.exports = router;