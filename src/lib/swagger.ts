import swaggerJsdoc from 'swagger-jsdoc'
import config from '../config/config.js'

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: config.name,
      version: config.version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.router.ts'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

export default swaggerDocs
