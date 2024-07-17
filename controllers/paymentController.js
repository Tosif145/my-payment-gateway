const Payment = require('../models/payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { user_id, amount, currency, payment_method } = req.body;
    const payment = await Payment.create({ user_id, amount, currency, payment_method, status: 'pending' });
    res.status(201).json({ payment_id: payment._id, status: payment.status }); // Assuming Mongoose uses _id for ObjectId
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Process a payment
exports.processPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.payment_id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    payment.status = 'processed';
    await payment.save();
    res.json({ payment_id: payment._id, status: payment.status });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get payment status
exports.getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.payment_id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({
      payment_id: payment._id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      payment_method: payment.payment_method
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updatePayment = async (req, res) => {
  const { payment_id } = req.params;
  const updateFields = req.body;

  try {
    const payment = await Payment.findByIdAndUpdate(
      payment_id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({ payment_id: payment._id, status: payment.status , updateFields: updateFields });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deletePayment = async (req, res) => {
  const { payment_id } = req.params;

  try {
    const payment = await Payment.findById(payment_id);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await payment.deleteOne(); // or payment.remove() if you prefer

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
