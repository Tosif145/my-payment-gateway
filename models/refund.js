const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
});

// Create a model based on the schema
const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;
