import { FastifyInstance } from 'fastify'
import { userRoutes } from '../modules/users/routes/userRoute.js'
import { authRoutes } from '../modules/auth/routes/auth.js'

export const registerRoutes = (server: FastifyInstance) => {
  const apiPrefix = {
    prefix: '/api',
  }

  server.register(userRoutes, apiPrefix)
  server.register(authRoutes, apiPrefix)
}
