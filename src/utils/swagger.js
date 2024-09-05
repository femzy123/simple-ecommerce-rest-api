const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require("swagger-ui-express")
const env = require('dotenv')

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "E-commerce API",
    version: "1.0.0",
    description:
      "API for managing products and categories in an e-commerce website",
  },
  servers: [
    {
      url: process.env.SITE_URL,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Location of your routes
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger