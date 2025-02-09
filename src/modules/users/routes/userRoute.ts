import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UserController } from '../controllers/UserController.js'

const userController = new UserController()
export const userRoutes = async (server: FastifyInstance) => {
  server.post('/users', userController.createUser)
  server.post('/users/login', userController.login)
  server.get('/user', userController.getAllUsersController)
}
