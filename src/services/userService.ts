import { encryptPassword } from '../util/encrypt.js'
import { UserEntity } from '../interfaces/UserEntity.js'
import { UserInput } from '../schemas/userSchema.js'
import { UserRepository } from '../repositories/UserRepository.js'

const userRepository = new UserRepository()
export class UserService {
  async create(credentials: UserInput) {
    credentials.password = await encryptPassword(credentials.password)
    await userRepository.create(credentials)
  }

  async findAll() {
    const users: UserEntity[] = await userRepository.findAll()
    const usersOnlyUsernameAndEmail: UserEntity[] = []
    users.forEach(user =>
      usersOnlyUsernameAndEmail.push({
        username: user.username,
        email: user.email
      })
    )
    return usersOnlyUsernameAndEmail
  }
}
