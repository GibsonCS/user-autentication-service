import { FastifyInstance } from 'fastify'

export const authMiddleware = (server: FastifyInstance) => {
  server.addHook('onRequest', (req, reply, done) => {
    if (req.url === '/api/user' || req.url === '/api/auth/login') {
      if (req.method === 'POST') {
        return done()
      }
    }
    const token = req.headers.cookie?.replace('authToken=', '')
    token ? done() : reply.status(401).send({ message: 'Unauthorized' })
  })
}
