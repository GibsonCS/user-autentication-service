import { FastifyInstance } from "fastify";

export const authMiddleware = (server: FastifyInstance) => {
    server.addHook('onRequest', (req, reply, done) => {
        console.log('Rota interceptada')
        if (req.url === '/api/create' || req.url === '/api/login') return done()

        const token = req.headers.cookie?.replace('authToken=', '')
        console.log(token)
        token ? done() : reply.status(401).send({ message: 'Não autorizado' })
    })
}