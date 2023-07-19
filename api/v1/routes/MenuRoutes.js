const router = require("express").Router();
const MenuController = require("../controllers/MenuController");
const TokenHelper = require("../helpers/TokenHelper");

router.post("/categories", TokenHelper.verifySuperAdmin, MenuController.createNewCategory);

router.post("/items", TokenHelper.verifySuperAdmin, MenuController.createNewMenuItem);

router.get("/categories", TokenHelper.verifySuperAdmin, MenuController.getAllMenuCategories)

router.get("/categories/:id", TokenHelper.verifySuperAdmin, MenuController.getMenuCategory)

router.patch("/categories/:id", TokenHelper.verifySuperAdmin, MenuController.updateMenuCategoryDetails)

router.patch("/items/:id", TokenHelper.verifySuperAdmin, MenuController.updateMenuItem)

router.delete("/categories/:id", TokenHelper.verifySuperAdmin, MenuController.deleteMenuCategory);

router.delete("/items/:id", TokenHelper.verifySuperAdmin, MenuController.deleteMenuCategory);

module.exports = router;