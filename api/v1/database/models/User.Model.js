const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', default: null },
  referred_by: { type: mongoose.ObjectId, default: null, },
  referrals_made: {type: Array,  data: mongoose.ObjectId, default: null },
  email: { type: String, required: true, unique: true, default: null },
  phone: { type: String, required: true, unique: true, default: null },
  password: { type: String, required: true, default: null },
  isAdmin: { type: Boolean, default: false, required: true },
  isSuperAdmin: { type: Boolean, default: false, required: true },
  commissionDue: { type: Number, default: 0, required: true },
  nextLevelRank: { type: Number, default: 1, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);