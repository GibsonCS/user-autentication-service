import { FastifyRequest, FastifyReply } from "fastify"
import { LoginInput, loginValidation } from "../schemas/userSchema"
import * as loginService from '../services/loginService.js'

export const loginController = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const data: LoginInput = loginValidation.parse(req.body)
        const jwt = await loginService.loginService(data)
        if (jwt) {
            reply.setCookie('authToken', jwt, {
                httpOnly: true,
                secure: false,
                path: '/',
                maxAge: 3600
            }).status(200).send({ username: data.username })
        } else {
            reply.status(401).send({ message: 'Verifique as credencias.' })
        }
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}