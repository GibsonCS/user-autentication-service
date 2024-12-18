import { FastifyInstance } from "fastify"
import { loginRoute } from "./loginRoute.js"
import { createUserRoute } from "./userRoute.js"

export const registerRoutes = (server: FastifyInstance) => {
    const apiPrefix = {
        prefix: '/api'
    }

    server.register(createUserRoute, apiPrefix)
    server.register(loginRoute, apiPrefix)
}