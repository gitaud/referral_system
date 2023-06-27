const router = require("express").Router();
const TokenHelper = require("../helpers/TokenHelper");
const TransactionController = require("../controllers/TransactionController");

router.post("/", TokenHelper.verifyAdmin, TransactionController.createTransaction);

router.get("/:id", TokenHelper.verifyAdmin, TransactionController.getOneTransaction);

router.get("/", TokenHelper.verifyAdmin, TransactionController.getAllTransactions);

module.exports = router;