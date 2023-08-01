const TransactionService = require("../services/TransactionService");

const createTransaction = async (req, res) => {
	try {
		let { 
			recorded_by, 
			amount, 
			customer_id, 
			redeemed, 
			redeemedTotal, 
			customer_level_id, 
			items 
		} = req.body;

		if (!recorded_by || !amount || !items ) {
			throw {
				status: 400,
				message: 'Ensure all fields are filled'
			}
		}

		let transactionData = { 
			recorded_by, 
			amount, 
			customer_id, 
			customer_level_id, 
			items,
			redeemed,
			redeemedTotal 
		} 
		const transaction = await TransactionService.createTransaction(transactionData);
		return res.json(transaction);
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const getOneTransaction = async (req, res) => {
	try {
		const transactionId = req.params.id;
		if (!transactionId) {
			throw {
				status: 400,
				message: "Must provide transaction id"
			}
		} 
		const transaction = await TransactionService.getOneTransaction(transactionId);
		return res.json(transaction);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const getAllTransactions = async (req, res) => {
	try {
		const { date_gte, date_lte, customer_id } = req.query;
		let transactions = await TransactionService.getAllTransactions({ date: {lte: date_lte, gte: date_gte}, customer_id });
		if (transactions.length === 0) {
			throw {
				status: 500,
				message: "Could not find transactions"
			}
		}
		return res.json(transactions);
	} catch (error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

const getTransactionIncome = async (req, res) => {
	try {
		const transactions = await TransactionService.getTransactionIncome();
		return res.json(transactions);
	} catch(error) {
		return res
			.status(error?.status || 500)
			.json(error?.message || error);
	}
}

module.exports = {
	createTransaction,
	getOneTransaction,
	getAllTransactions,
	getTransactionIncome,
}