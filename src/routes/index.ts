import { FastifyInstance } from "fastify"
import { loginRoute } from "./loginRoute.js"
import { createUserRoute, getUsersRoute } from "./userRoute.js"
import { authRoute } from "./authRoute.js"

export const registerRoutes = (server: FastifyInstance) => {
    const apiPrefix = {
        prefix: '/api'
    }

    server.register(createUserRoute, apiPrefix)
    server.register(loginRoute, apiPrefix)
    server.register(getUsersRoute, apiPrefix)
    server.register(authRoute, apiPrefix)
}