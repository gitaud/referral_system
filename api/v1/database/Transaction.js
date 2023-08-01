const Transaction = require("./models/Transaction.Model");

const createTransaction = async (data) => {
	try {
		const transaction = new Transaction(data);
		await transaction.save();
		const returnedTransaction = await getOneTransaction(transaction._id);
		return returnedTransaction;
	} catch(error) {
		throw {
			status: error?.status || 500,
			message: error?.message || error
		}
	}
}

const getOneTransaction = async (transactionId) => {
	try {
		const transaction = await Transaction.findById(transactionId)
			.populate('customer_id', 'name level commissionDue').exec();
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
		
		if (filterParams.customer_id) {
			transactions = await Transaction.find({
				createdAt: {
					$gte: dateFilter.gte,
					$lte: dateFilter.lte
				},
				customer_id: filterParams.customer_id
			}).select('customer_id amount commission recorded_by createdAt').sort("-createdAt").populate('customer_id', 'name').exec();
		} else {
			transactions = await Transaction.find({ 
				createdAt: { 
					$gte: dateFilter.gte, 
					$lte: dateFilter.lte
				}
			}).select('customer_id amount commission recorded_by createdAt').sort("-createdAt");
		}


		if (!transactions.length) {
			throw {
				status: 400,
				message: "No transactions found"
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

const getTransactionIncome = async (monthGte) => {
	try {
		const transactions = await Transaction.aggregate([
			{
				$match: {
					createdAt: {
						$gte: monthGte
					}
				}
			},
			{
				$project: {
					month: { $month: "$createdAt" },
					sales: "$amount"
				}
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: "$sales" }
				}
			}
		])
		if (!transactions) {
			throw {
				status: 400,
				message: 'No transaction data found'
			}
		}
		return transactions;
	} catch(error) {
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
	getTransactionIncome
}