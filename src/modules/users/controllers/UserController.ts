import { loginSchema, UserInput, UserOutput, userSchema } from '../schemas/userSchema.js'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/UserService.js'
import { UserRepositoryFactory } from '../../../shared/factories/UserRepositoryFactory.js'

const userRepository = UserRepositoryFactory.createUserRepository('prod')
const userService = new UserService(userRepository)
export class UserController {
  async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data: UserInput = userSchema.parse(req.body)
      await userService.create(data)
      reply.status(201).send({ message: `Usuário ${data.username} criado com sucesso!` })
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  async getAllUsersController(_: FastifyRequest, reply: FastifyReply) {
    try {
      const users: UserOutput[] = await userService.findAll()
      users.length !== 0
        ? reply.status(200).send(users)
        : reply.status(404).send({ message: 'Nenhum usuário encontrado' })
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = loginSchema.parse(request.body)
      const jwt: any = await userService.handleLogin(data)
      if (jwt) {
        reply
          .setCookie('authToken', jwt, {
            httpOnly: true,
            secure: false,
            path: '/',
            maxAge: 3600,
          })
          .status(200)
          .send({ message: 'Welcome', token: jwt })
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
