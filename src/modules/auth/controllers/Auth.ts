import { FastifyReply, FastifyRequest } from 'fastify'
import { jwtDecoded } from '../../../shared/util/jwtDecode.js'

export class AuthController {
  handleAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    const authToken = request.headers.cookie
    if (authToken) {
      const tokenWithoutPrefix = authToken.split(';')[0].replace('authToken=', '')
      const payload: any = jwtDecoded(tokenWithoutPrefix)
      return reply.send({ role: `${payload.role}` })
    }
    return reply.status(401)
  }
}
