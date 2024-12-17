import { FastifyInstance } from "fastify";
import * as userController from '../controllers/userController.js'

export const createUserRoute = async (server: FastifyInstance) => {
    server.post('/create', userController.createUserController)
}