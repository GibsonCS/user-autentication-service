import { FastifyInstance } from 'fastify'
import { userRoutes } from '../modules/users/routes/userRoute.js'

export const registerRoutes = (server: FastifyInstance) => {
  const apiPrefix = {
    prefix: '/api',
  }

  server.register(userRoutes, apiPrefix)
}
