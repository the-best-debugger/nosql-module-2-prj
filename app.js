const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Not Found' }));

// Global error handler
app.use(errorHandler);

module.exports = app;
