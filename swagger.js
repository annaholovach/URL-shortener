// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Описи для Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'URL Shortener API',
    version: '1.0.0',
    description: 'API для скорочення URL та отримання оригінального URL за кодом.',
  },
};

// Налаштування для swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // шляхи до файлів з вашими маршрутами
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
