import { FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const registerSwagger = async (server: FastifyInstance) => {
  server.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'User Auth API',
        description: 'API Documentation',
        version: '1.0.0',
      },
      servers: [{ url: process.env.SWAGGER_URL }],
      // servers: [{ url: 'http://localhost:3000' }],
      components: {
        schemas: {
          user: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
              email: { type: 'string', format: 'email', example: 'email@domain.com' },
            },
          },
          login: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
      },
    },
  })

  server.register(fastifySwaggerUi, { routePrefix: '/api/documentation' })
}
