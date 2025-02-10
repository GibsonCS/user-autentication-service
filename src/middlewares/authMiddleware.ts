import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const authMiddleware = (server: FastifyInstance) => {
  server.addHook('onRequest', (req: FastifyRequest, reply: FastifyReply, done) => {
    if (req.url === '/api/users/login' || req.url === '/api/users') {
      if (req.method === 'POST') {
        return done()
      }
    }
    const token = req.headers.cookie?.replace('authToken=', '')
    token ? done() : reply.status(401).send({ message: 'Unauthorized' })
  })
}
