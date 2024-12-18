import * as userRepository from '../repositories/userRepository.js'
import { LoginInput } from '../schemas/userSchema.js'
import { comparePassword } from '../util/comparePassword.js'
import { generateJWT } from '../util/jwtGenerate.js'

export const loginService = async (credentials: LoginInput) => {
    const user = await userRepository.getUserByLogin(credentials.username)
    const passwordFromDB: string = user.password
    const isTrue = await comparePassword(credentials.password, passwordFromDB);
    if (isTrue) {
        return generateJWT({ username: user.username })
    }
}