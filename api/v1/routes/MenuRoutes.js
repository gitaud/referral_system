const router = require("express").Router();
const MenuController = require("../controllers/MenuController");
const TokenHelper = require("../helpers/TokenHelper");

router.post("/categories", TokenHelper.verifyAdmin, MenuController.createCategory);

router.post("/items", TokenHelper.verifyAdmin, MenuController.createMenuItem);

router.get("/categories", TokenHelper.verifyAdmin, MenuController.getAllMenuCategories)

router.get("/categories/:id", TokenHelper.verifyAdmin, MenuController.getMenuCategory)

router.patch("/categories/:id", TokenHelper.verifyAdmin, MenuController.updateMenuCategoryDetails)

router.patch("/items/:id", TokenHelper.verifyAdmin, MenuController.updateMenuItem)

router.delete("/categories/:id", TokenHelper.verifySuperAdmin, MenuController.deleteMenuCategory);

router.delete("/items/:id", TokenHelper.verifySuperAdmin, MenuController.deleteMenuItem);

module.exports = router;