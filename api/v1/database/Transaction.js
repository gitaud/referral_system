const Transaction = require("./models/Transaction.Model");

const createTransaction = async (data) => {
	try {
		const transaction = new Transaction(data);
		await transaction.save();
		return transaction
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getOneTransaction = async (transactionId) => {
	try {
		const transaction = await Transaction.findById(transactionId);
		if (!transaction) {
			throw {
				status: 400,
				message: `No transaction with the id ${transactionId} found`
			}
		}
		return transaction;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getAllTransactions = async (filterParams) => {
	try {
		let transactions;
		const dateFilter = {
			gte: new Date(filterParams.date.gte),
			lte: new Date(filterParams.date.lte)
		}
		dateFilter.lte.setHours(23, 59, 59);
		transactions = await Transaction.find({ 
			createdAt: { 
				$gte: dateFilter.gte, 
				$lte: dateFilter.lte
			}
		});
		if (filterParams.customer_id) {
			transactions = transactions.filter(transaction => transaction.customer_id == filterParams.customer_id)
		}
		if (!transactions) {
			throw {
				status: 400,
				messge: "No transactions found"
			}
		}
		return transactions;
	} catch (error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}


module.exports = {
	createTransaction,
	getOneTransaction,
	getAllTransactions,
}