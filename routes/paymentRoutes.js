const express = require('express');
const { createPayment, processPayment, getPaymentStatus,updatePayment,deletePayment } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createPayment);
router.post('/:payment_id/process', authMiddleware, processPayment);
router.get('/:payment_id', authMiddleware, getPaymentStatus);
router.patch('/update/:payment_id', authMiddleware, updatePayment);
router.delete('/delete/:payment_id', authMiddleware, deletePayment);

module.exports = router;
