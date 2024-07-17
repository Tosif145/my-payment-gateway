const { Payment } = require('../models');

class PaymentService {
  async createPayment(userId, amount, currency, paymentMethod) {
    try {
      const payment = new Payment({
        user_id: userId,
        amount,
        currency,
        payment_method: paymentMethod,
        status: 'pending'
      });
      await payment.save();
      return payment;
    } catch (error) {
      throw new Error('Error creating payment');
    }
  }

  async processPayment(paymentId) {
    try {
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        throw new Error('Payment not found');
      }
      payment.status = 'processed';
      await payment.save();
      return payment;
    } catch (error) {
      throw new Error('Error processing payment');
    }
  }

  async getPaymentStatus(paymentId) {
    try {
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        throw new Error('Payment not found');
      }
      return payment;
    } catch (error) {
      throw new Error('Error retrieving payment status');
    }
  }
}

module.exports = new PaymentService();
