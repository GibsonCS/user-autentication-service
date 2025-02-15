import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { jwtDecoded } from '../shared/util/jwtDecode.js'
import { extractToken } from '../shared/util/extractToken.js'

export const authMiddleware = (server: FastifyInstance) => {
  const publicRoutes = ['/api/users/login', '/api/users']

  server.addHook('onRequest', (req: FastifyRequest, reply: FastifyReply, done) => {
    if (publicRoutes.includes(req.url) && req.method === 'POST') return done()

    const token = extractToken(req.headers.cookie)

    if (!token) return reply.status(401).send({ message: 'Unauthorized' })

    const payload: any = jwtDecoded(token)

    if (!payload) return reply.status(401).send({ message: 'Unauthorized' })

    return done()
  })
}
