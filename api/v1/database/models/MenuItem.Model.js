const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true, min: 0 },
	category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Item', ItemSchema);