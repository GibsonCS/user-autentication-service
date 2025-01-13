import { FastifyInstance } from "fastify"
import { userRoutes } from "./userRoute.js"
import { authRoutes } from "./authRoute.js"

export const registerRoutes = (server: FastifyInstance) => {
    const apiPrefix = {
        prefix: '/api'
    }

    server.register(userRoutes, apiPrefix)
    server.register(authRoutes, apiPrefix)
}