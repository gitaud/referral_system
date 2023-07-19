const mongoose = require("mongoose");
const Item = require("./MenuItem.Model");

const CategorySchema = new mongoose.Schema({
	name: { type: String, required: true },
	items: { type: Array, data: mongoose.Schema.Types.ObjectId, ref: 'Item' },
});

module.exports = mongoose.model('Category', CategorySchema);