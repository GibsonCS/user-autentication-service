import { FastifyReply, FastifyRequest } from 'fastify'
import { jwtDecoded } from '../../../shared/util/jwtDecode.js'
import { extractToken } from '../../../shared/util/extractToken.js'

export class AuthController {
  handleAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = extractToken(request.headers.cookie)
    const payload: any = jwtDecoded(token)
    return reply.send({ role: `${payload.role}` })
  }
}
