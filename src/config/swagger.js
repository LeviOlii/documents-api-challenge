const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        tags: [
            { name: 'Authentication', description: 'User login and registration' },
            { name: 'Datasets', description: 'File upload and management' },
            { name: 'Queries', description: 'AI simulation and history' }
        ],
        info: {
            title: 'Documents API Challenge',
            version: '1.0.0',
            description: 'Documents API for the backend technical challenge',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                Dataset: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        userId: { type: 'integer' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Record: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        datasetId: { type: 'integer' },
                        data: { type: 'object' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Query: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        question: { type: 'string' },
                        answer: { type: 'string' },
                        datasetId: { type: 'integer', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = { setupSwagger };