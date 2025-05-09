import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/Auth.js'
import { authSwaggerSchema } from '../../../documentation/schemas/authSwaggerSchema.js'

const controlller = new AuthController()
export const authRoutes = async (server: FastifyInstance) => {
  server.get('/auth', authSwaggerSchema, controlller.handleAuth)
}
