const router = require("express").Router();

const userController = require("../controllers/userController");

router.get("/search", userController.searchUser);

router.get("/:id", userController.getOneUser);

router.get("/", userController.getAllUsers);

router.post("/", userController.createNewUser);

router.patch("/:id", userController.updateUser);

router.patch("/referral/add/:id", userController.updateUserAddReferral);

router.patch("/level/add/:id", userController.updateUserIncreaseLevel);

router.delete("/:id", userController.deleteUser);

module.exports = router;