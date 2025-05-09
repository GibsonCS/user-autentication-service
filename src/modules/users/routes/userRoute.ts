import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/UserController.js'
import {
  swaggerUserCreateSchema,
  swaggerLoginSchema,
  swaggerGetUserSchema,
} from '../../../documentation/schemas/userSwaggerSchema.js'

const userController = new UserController()
export const userRoutes = async (server: FastifyInstance) => {
  server.post('/users', swaggerUserCreateSchema, userController.handleUserRegister)
  server.post('/users/login', swaggerLoginSchema, userController.handleLogin)
  server.get('/users', swaggerGetUserSchema, userController.handleGettingUsers)
}
