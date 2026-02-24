const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API',
      version: '1.0.0',
      description: 'Demo API with global error handling and Swagger docs (users endpoints).'
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-v4' },
            name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', example: 'jane@example.com' }
          }
        },
        UserInput: {
          type: 'object',
          required: ['name','email'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    },
    paths: {
      '/users': {
        get: {
          summary: 'List users',
          responses: {
            '200': { description: 'OK' },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        post: {
          summary: 'Create user',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UserInput' } } } },
          responses: {
            '201': { description: 'Created' },
            '400': { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/users/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        get: {
          summary: 'Get user by id',
          responses: {
            '200': { description: 'OK' },
            '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        put: {
          summary: 'Update user',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UserInput' } } } },
          responses: {
            '200': { description: 'Updated' },
            '400': { description: 'Validation error' },
            '404': { description: 'Not found' },
            '500': { description: 'Server error' }
          }
        },
        delete: {
          summary: 'Delete user',
          responses: {
            '200': { description: 'Deleted' },
            '404': { description: 'Not found' },
            '500': { description: 'Server error' }
          }
        }
      }
    }
  },
  apis: []
};

module.exports = swaggerJSDoc(options);
