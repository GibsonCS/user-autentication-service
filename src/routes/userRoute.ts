import { getUserByLogin } from './../repositories/userRepository.js';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as userController from '../controllers/userController.js'

export const createUserRoute = async (server: FastifyInstance) => {
    server.post('/create', userController.createUserController)
}

export const getUsersRoute = async (server: FastifyInstance) => {
    server.get('/users', userController.getUsersController)
}

export const getUserRoute = async (server: FastifyInstance) => {
    server.get('/user', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send(getUserByLogin('gibson'))
    })
}