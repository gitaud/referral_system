const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  savings: { type: Number, default: 6, max: 100, required: true,},
  rank: { type: Number, required: true, unique: true } // Rank increases with savings
}, { timestamps: true});

module.exports = mongoose.model('Level', LevelSchema);