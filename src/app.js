const express = require('express');
const cors = require('cors');
const { setupSwagger } = require('./config/swagger');
const router = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

// Swagger
setupSwagger(app);

// Error handling
app.use(errorHandler);

module.exports = app;