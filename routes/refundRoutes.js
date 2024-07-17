const express = require('express');
const { createRefund, getRefundStatus } = require('../controllers/refundController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:payment_id/refunds', authMiddleware, createRefund);
router.get('/:payment_id/refunds/:refund_id', authMiddleware, getRefundStatus);

module.exports = router;
