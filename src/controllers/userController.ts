import { userValidation } from '../schemas/userSchema';
import { FastifyReply, FastifyRequest } from "fastify";
import * as userService from '../services/userService.js'


export const createUserController = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = userValidation.parse(req.body)
        await userService.createUserService(data)
        reply.status(201).send({ message: `Usuário ${data.username} criado com sucesso!` })
    } catch (err) {
        console.error(err);
        throw new Error(err)
    }
}