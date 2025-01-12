import { UserInput, userValidation } from '../schemas/userSchema.js';
import { FastifyReply, FastifyRequest } from "fastify";
import * as userService from '../services/userService.js'
import { User } from '../interfaces/user.interface.js';

export const createUserController = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const data: UserInput = userValidation.parse(req.body)
        await userService.createUserService(data)
        reply.status(201).send({ message: `Usuário ${data.username} criado com sucesso!` })
    } catch (err) {
        console.error(err);
        throw new Error(err)
    }
}

export const getUsersController = async (_: FastifyRequest, reply: FastifyReply) => {
    try {
        const users: User[] = await userService.getUsersService()
        users.length !== 0 ? reply.status(200).send(users) : reply.status(404).send({ message: 'Nenhum usuário encontrado' })
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}