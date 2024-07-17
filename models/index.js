const mongoose = require('mongoose');
const config = require('../config/config');

// Connect to MongoDB using Mongoose
mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB schemas and models
const User = require('./user');
const Payment = require('./payment');
const Refund = require('./refund');

module.exports = { mongoose, User, Payment, Refund };
