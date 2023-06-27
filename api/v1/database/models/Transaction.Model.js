const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	amount: { type: Number, min: 0, required: true, immutable: true },
	customer_id: { type: mongoose.ObjectId, required: true, immutable: true },
	commission: { type: Number, immutable: true },
	recorded_by: { type: mongoose.ObjectId, required: true, immutable: true },
}, { timestamps: true});

module.exports = mongoose.model('Transaction', TransactionSchema);