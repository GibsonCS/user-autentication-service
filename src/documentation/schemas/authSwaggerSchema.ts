import { FastifySchema } from 'fastify'

export const authSwaggerSchema: { schema: FastifySchema } = {
  schema: {
    description: 'Get user roles',
    tags: ['Auth'],
    summary: 'Return a users array',
    // security: [{ apiKey: [] }],
    response: {
      200: {
        description: 'success',
        type: 'object',
        properties: {
          users: {
            type: 'array',
            properties: {
              username: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
      },
    },
  },
}
