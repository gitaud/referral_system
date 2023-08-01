const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	amount: { type: Number, min: 0, required: true, immutable: true },
	customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, immutable: true },
	commission: { type: Number, immutable: true },
	items: { type: Object, immutable: true },
	redeemed: { type: Boolean, immutable: true },
	redeemedTotal: { type: Number, min: 0, immutable: true },
	recorded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
}, { timestamps: true});

module.exports = mongoose.model('Transaction', TransactionSchema);