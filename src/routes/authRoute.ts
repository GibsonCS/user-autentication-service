import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { jwtDecoded } from "../util/jwdDecode.js";


export const authRoute = async (server: FastifyInstance) => {
    server.get('/check-auth', (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.cookies.authToken
        const decodedToke = jwtDecoded(token)
        reply.send({ username: decodedToke.username, roles: [decodedToke.roles] })
    })
}