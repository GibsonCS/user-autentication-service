import { FastifySchema } from 'fastify'

export const swaggerUserCreateSchema: { schema: FastifySchema } = {
  schema: {
    description: 'Create user',
    //join all endpoints by name "Users"
    tags: ['Users'],
    summary: 'create a user and return a success message',
    body: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
      },
    },
    response: {
      201: {
        description: 'created',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}

export const swaggerLoginSchema: { schema: FastifySchema } = {
  schema: {
    description: 'Login',
    tags: ['Users'],
    summary: 'Return a username and role user',
    body: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        description: 'success',
        type: 'object',
        properties: {
          username: { type: 'string' },
          role: { type: 'string' },
        },
      },
    },
  },
}

export const swaggerGetUserSchema: { schema: FastifySchema } = {
  schema: {
    description: 'Get users',
    tags: ['Users'],
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
