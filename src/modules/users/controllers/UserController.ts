import {
  LoginInput,
  loginSchema,
  UserInput,
  UserOutput,
  userSchema,
} from '../schemas/userSchema.js'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/UserService.js'
import { UserRepositoryFactory } from '../../../shared/factories/UserRepositoryFactory.js'
import { jwtDecoded } from '../../../shared/util/jwtDecode.js'

const userRepository = UserRepositoryFactory.createUserRepository('prod')
const userService = new UserService(userRepository)
export class UserController {
  async handleUserRegister(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data: UserInput = userSchema.parse(req.body)
      await userService.registerUser(data)
      reply.status(201).send({ message: `Usuário ${data.username} criado com sucesso!` })
    } catch (err) {
      console.error(err)
      throw new Error('Verify input data and try again')
    }
  }

  async handleGettingUsers(_: FastifyRequest, reply: FastifyReply) {
    try {
      const users: UserOutput[] = await userService.getUsers()
      users.length !== 0
        ? reply.status(200).send(users)
        : reply.status(404).send({ message: 'Nenhum usuário encontrado' })
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  handleLogin = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data: LoginInput = loginSchema.parse(request.body)
      const jwt: string = await userService.loginUser(data)
      if (jwt) {
        const decodedToken: any = jwtDecoded(jwt)
        reply
          .setCookie('authToken', jwt, {
            httpOnly: true,
            secure: false,
            path: '/',
            maxAge: 3600,
          })
          .status(200)
          .send({ username: decodedToken.username, role: decodedToken.role })
      } else {
        reply.status(401).send({ message: 'Verifique as credencias.' })
      }
    } catch (err) {
      console.error(err)
      throw new Error('Error processing login')
    }
  }
}
