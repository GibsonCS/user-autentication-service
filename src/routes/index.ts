import { FastifyInstance } from "fastify"
import { loginRoute } from "./loginRoute"
import { createUserRoute } from "./userRoute"

export const registerRoutes = (server: FastifyInstance) => {
    const apiPrefix = {
        prefix: '/api'
    }

    server.register(loginRoute, apiPrefix)
    server.register(createUserRoute, apiPrefix)
}