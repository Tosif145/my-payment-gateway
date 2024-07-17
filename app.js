const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json'); // Make sure the path is correct
const config = require('./config/config');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const refundRoutes = require('./routes/refundRoutes');

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(config.development.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit process on connection failure
});

// Routes
app.get('/', (req, res) => {
  res.send('Payment Gateway API');
});

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/refunds', refundRoutes);

// Serve Swagger UI documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
