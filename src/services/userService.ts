import { encryptPassword } from '../util/encrypt.js'
import { User } from '../interfaces/user.interface.js'
import { UserInput } from '../schemas/userSchema.js'
import { UserRepository } from '../repositories/UserRepository.js'

const userRepository = new UserRepository()
export class UserService {
  async create (credentials: UserInput) {
    credentials.password = await encryptPassword(credentials.password)
    await userRepository.create(credentials)
  }

  async findAll () {
    const users: User[] = await userRepository.findAll()
    const usersOnlyUsernameAndEmail: User[] = []
    users.forEach(user =>
      usersOnlyUsernameAndEmail.push({
        username: user.username,
        email: user.email
      })
    )
    return usersOnlyUsernameAndEmail
  }
}
