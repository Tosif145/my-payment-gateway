// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Payment Gateway API',
      version: '1.0.0',
      description: 'API documentation for Payment Gateway',
    },
  },
  apis: ['./routes/*.js'], // Adjust path to match your API route files
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
