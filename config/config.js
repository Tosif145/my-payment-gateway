module.exports = {
  development: {
    mongodbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/payment_gateway'
  }
};
