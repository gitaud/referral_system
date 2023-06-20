const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const LevelController = require("../controllers/levelController");

router.get("/:id", LevelController.getOneLevel);

router.get("/", LevelController.getAllLevels);

router.post("/", LevelController.createLevel);

router.patch("/:id", LevelController.updateLevel);

router.delete("/:id", LevelController.deleteOneLevel);

module.exports = router;