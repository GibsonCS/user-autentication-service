import { UserInput, userValidation } from '../schemas/userSchema.js'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserEntity } from '../interfaces/UserEntity.js'
import { UserService } from '../services/UserService.js'

const userService = new UserService()
export class UserController {
  async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data: UserInput = userValidation.parse(req.body)
      await userService.create(data)
      reply
        .status(201)
        .send({ message: `Usuário ${data.username} criado com sucesso!` })
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  async getAllUsersController(_: FastifyRequest, reply: FastifyReply) {
    try {
      const users: UserEntity[] = await userService.findAll()
      users.length !== 0
        ? reply.status(200).send(users)
        : reply.status(404).send({ message: 'Nenhum usuário encontrado' })
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }
}
