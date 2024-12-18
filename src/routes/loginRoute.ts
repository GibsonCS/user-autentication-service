import { FastifyInstance } from "fastify"
import * as controller from '../controllers/loginController.js'

export const loginRoute = async (server: FastifyInstance) => {
    server.post('/login', controller.loginController)
}