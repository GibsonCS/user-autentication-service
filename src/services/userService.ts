import { encryptPassword } from './../util/encrypt.js';
import * as repository from '../repositories/userRepository.js'
import { User } from '../interfaces/user.interface.js';
import { UserInput } from '../schemas/userSchema.js';

export const createUserService = async (credentials: UserInput) => {
    credentials.password = await encryptPassword(credentials.password)
    await repository.createUser(credentials)
}

export const getUsersService = async () => {
    const users: User[] = await repository.getUsers();
    const usersOnlyUsernameAndEmail: User[] = []
    users.forEach(user => usersOnlyUsernameAndEmail.push({ username: user.username, email: user.email }))
    return usersOnlyUsernameAndEmail
}