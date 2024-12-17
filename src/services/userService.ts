import { encryptPassword } from './../util/encrypt.js';
import * as repository from '../repositories/userRepository.js'
import { UserInput } from '../schemas/userSchema.js'

export const createUserService = async (credentials: UserInput) => {
    credentials.password = await encryptPassword(credentials.password)
    await repository.createUser(credentials)
}