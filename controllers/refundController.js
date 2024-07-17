const Refund = require('../models/refund');

// Create a new refund
exports.createRefund = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const { amount } = req.body;
    const refund = await Refund.create({ payment_id, amount, status: 'pending' });
    res.status(201).json({ refund_id: refund._id, status: refund.status }); // Assuming Mongoose uses _id for ObjectId
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get refund status
exports.getRefundStatus = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.refund_id);
    if (!refund) {
      return res.status(404).json({ error: 'Refund not found' });
    }
    res.json({ refund_id: refund._id, status: refund.status, amount: refund.amount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
