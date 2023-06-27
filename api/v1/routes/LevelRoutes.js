const router = require("express").Router();
const TokenHelper = require("../helpers/TokenHelper");
const LevelController = require("../controllers/LevelController");

router.get("/:id", TokenHelper.verifyAdmin, LevelController.getOneLevel);

router.get("/", TokenHelper.verifyAdmin, LevelController.getAllLevels);

router.post("/", TokenHelper.verifyAdmin, LevelController.createLevel);

router.patch("/:id", TokenHelper.verifyAdmin, LevelController.updateLevel);

router.delete("/:id", TokenHelper.verifyAdmin, LevelController.deleteOneLevel);

module.exports = router;