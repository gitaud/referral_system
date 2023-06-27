const TransactionService = require("../services/transactionService");

const createTransaction = async (req, res) => {
	try {
		let {recorded_by, amount, customer_id, customer_level_id } = req.body;
		if (!recorded_by || !amount || !customer_id || !customer_level_id) {
			throw {
				status: 400,
				message: 'Ensure all fields are filled'
			}
		}
		const transaction = await TransactionService.createTransaction({recorded_by, amount, customer_id, customer_level_id });
		return res.json({ status: 'OK', data: transaction });
	} catch(error) {
		return res.
			status(error?.status || 500)
			.json({status: 'FAILED', message: error?.message || error })
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
		return res.json({ status: 'OK', data: transaction})
	} catch (error) {
		return res.
			status(error?.status || 500)
			.json({ status: 'FAILED', message: error?.message || error })
	}
}

const getAllTransactions = async (req, res) => {
	try {
		const { date_gte, date_lte, customer_id } = req.query;
		let transactions = await TransactionService.getAllTransactions({ date: {lte: date_gte, gte: date_lte}, customer_id });
		if (!transactions) {
			throw {
				status: 500,
				message: "Could not find transactions"
			}
		}
		return res.json({ status: 'OK', data: transactions })
	} catch (error) {
		return res.
			status(error?.status || 500)
			.json({ status: 'FAILED', message: error?.message || error })
	}
}

module.exports = {
	createTransaction,
	getOneTransaction,
	getAllTransactions,
}