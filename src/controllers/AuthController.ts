import { FastifyRequest, FastifyReply } from 'fastify'
import { LoginInput, loginValidation } from '../schemas/userSchema.js'
import { jwtDecoded } from '../util/jwtDecode.js'
import { AuthService } from '../services/AuthService.js'

const authService = new AuthService()
class AuthController {
  async checkAuth(request: FastifyRequest, repply: FastifyReply) {
    try {
      const token = request.cookies.authToken
      const decodedToken: any = jwtDecoded(token)
      repply.send({
        username: decodedToken.username,
        roles: decodedToken.roles
      })
    } catch (error) {
      console.error(error)
      throw new Error('Unauthorized')
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data: LoginInput = loginValidation.parse(request.body)
      const jwt = await authService.handleLogin(data)
      if (jwt) {
        reply
          .setCookie('authToken', jwt, {
            httpOnly: true,
            secure: false,
            path: '/',
            maxAge: 3600
          })
          .status(200)
          .send({ message: 'Wellcome' })
      } else {
        reply.status(401).send({ message: 'Verifique as credencias.' })
      }
    } catch (err) {
      console.error(err)
      reply.code(401)
      throw new Error('Error processing login')

    }
  }
}
export default AuthController
