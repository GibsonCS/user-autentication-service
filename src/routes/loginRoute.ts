import { FastifyInstance } from "fastify"

export const loginRoute = async (server: FastifyInstance) => {
    server.get('/login', (req, reply) => {
        reply.send({
            message: 'Login route'
        })
    })
}