import AuthController from "../controllers/AuthController.js";
import { FastifyInstance } from "fastify";

const authController = new AuthController()
export const authRoutes = async (server: FastifyInstance) => {
    server.post('/auth/login', authController.login)
    server.get('/auth/check', authController.checkAuth)
}