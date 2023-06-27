const router = require("express").Router();
const UserController = require("../controllers/UserController");
const TokenHelper = require("../helpers/TokenHelper");

router.get("/search", TokenHelper.verifyAdmin, UserController.searchUser);

router.get("/:id", TokenHelper.verifyAuthorized, UserController.getOneUser);

router.get("/", TokenHelper.verifyAdmin, UserController.getAllUsers);

router.post("/", TokenHelper.verifyAdmin, UserController.createNewUser);

router.patch("/:id", TokenHelper.verifyAuthorized, UserController.updateUser);

router.patch("/referral/add/:id", TokenHelper.verifyAdmin, UserController.updateUserAddReferral);

router.patch("/level/add/:id", TokenHelper.verifyAdmin, UserController.updateUserIncreaseLevel);

router.delete("/:id", TokenHelper.verifySuperAdmin, UserController.deleteUser);

module.exports = router;