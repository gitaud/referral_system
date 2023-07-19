const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	amount: { type: Number, min: 0, required: true, immutable: true },
	customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, default: null, immutable: true },
	commission: { type: Number, immutable: true },
	items: { type: Array, immutable: true },
	recorded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
}, { timestamps: true});

module.exports = mongoose.model('Transaction', TransactionSchema);