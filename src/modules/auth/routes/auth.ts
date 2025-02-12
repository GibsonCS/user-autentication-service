import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/Auth.js'

const controlller = new AuthController()
export const authRoutes = async (server: FastifyInstance) => {
  server.get('/auth', controlller.handleAuth)
}
