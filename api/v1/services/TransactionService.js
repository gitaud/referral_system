const Transaction = require("../database/Transaction");
const UserService = require("./UserService");
const LevelService = require("./LevelService");
const RoundOffHelper = require("../helpers/RoundOffHelper.js");

const createTransaction = async (data) => {
	try {
		let level, commission, transaction, userUpdated;
		let newTransaction = {
			amount: data.amount,
			recorded_by: data.recorded_by,
			items: data.items,
		}
		if (data.customer_level_id) {
			newTransaction.customer_id = data.customer_id;
			level = await LevelService.getOneLevel(data.customer_level_id);
			commission = Number(data.amount) * (level.savings / 100);
			newTransaction.commission = RoundOffHelper.roundToZero(commission);
		} else {
			newTransaction.customer_id = null;
		}
		transaction = await Transaction.createTransaction(newTransaction);
		
		if (transaction) {
			if (transaction.customer_id) {
				userUpdated = await UserService.updateUserCommissionDue(transaction.customer_id, transaction.commission, false);
			}
			return transaction;
		} else {
			throw {
				status: 500,
				message: "Error! Could not update user or transaction"
			}
		}
	} catch(error) {
		throw error;
	}
}

const getOneTransaction = async (transactionId) => {
	try {
		let level;
		let transaction = await Transaction.getOneTransaction(transactionId);
		if (transaction.customer_id?.level) {
			level = await LevelService.getOneLevel(transaction.customer_id.level);
		}
		return { ...transaction._doc, level};
	} catch (error) {
		throw error;
	}
}

const getAllTransactions = async (filterParams) => {
	try {
		const transactions = await Transaction.getAllTransactions(filterParams);
		return transactions;
	} catch (error) {
		throw error;
	}
}

const getTransactionIncome = async () => {
	try {
		const date = new Date();
		const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
		const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
		const transactions = await Transaction.getTransactionIncome(previousMonth);
		return transactions;
	} catch(error) {
		throw error;
	}
}

module.exports = {
	createTransaction,
	getOneTransaction,
	getAllTransactions,
	getTransactionIncome
}