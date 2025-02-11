import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UserController } from '../controllers/UserController.js'

const userController = new UserController()
export const userRoutes = async (server: FastifyInstance) => {
  server.post('/users', userController.handleUserRegister)
  server.post('/users/login', userController.handleLogin)
  server.get('/users', userController.handleGettingUsers)
}
