const Transaction = require("../database/Transaction");
const UserService = require("./UserService");
const LevelService = require("./LevelService");
const RoundOffHelper = require("../helpers/RoundOffHelper.js");

const createTransaction = async (data) => {
	try {
		let newTransaction = {
			customer_id: data.customer_id,
			amount: data.amount,
			recorded_by: data.recorded_by
		}
		const level = await LevelService.getOneLevel(data.customer_level_id);
		if (!level) {
			throw {
				status: 400,
				message: `No level with the id ${data.customer_level_id} found`
			}
		}
		let commission = Number(data.amount) * (level.savings / 100);
		newTransaction.commission = RoundOffHelper.roundToZero(commission);
		let transaction = await Transaction.createTransaction(newTransaction);
		let userUpdated = await UserService.updateUserCommissionDue(transaction.customer_id, transaction.commission, false);
		if (transaction && userUpdated) {
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
		let transaction = await Transaction.getOneTransaction(transactionId);
		return transaction;
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


module.exports = {
	createTransaction,
	getOneTransaction,
	getAllTransactions,
}