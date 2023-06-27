const router = require("express").Router();
const TransactionController = require("../controllers/transactionController");

router.post("/", TransactionController.createTransaction);

router.get("/:id", TransactionController.getOneTransaction);

router.get("/", TransactionController.getAllTransactions);

module.exports = router;