const router = require("express").Router();
const TokenHelper = require("../helpers/TokenHelper");
const LevelController = require("../controllers/LevelController");

router.get("/:id", LevelController.getOneLevel);

router.get("/", LevelController.getAllLevels);

router.post("/", LevelController.createLevel);

router.patch("/:id", LevelController.updateLevel);

router.delete("/:id", LevelController.deleteOneLevel);

module.exports = router;