const { Refund } = require('../models');

class RefundService {
  async createRefund(paymentId, amount) {
    try {
      const refund = new Refund({
        payment_id: paymentId,
        amount,
        status: 'pending'
      });
      await refund.save();
      return refund;
    } catch (error) {
      throw new Error('Error creating refund');
    }
  }

  async getRefundStatus(refundId) {
    try {
      const refund = await Refund.findById(refundId);
      if (!refund) {
        throw new Error('Refund not found');
      }
      return refund;
    } catch (error) {
      throw new Error('Error retrieving refund status');
    }
  }
}

module.exports = new RefundService();
