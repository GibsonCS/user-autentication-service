import { encryptPassword } from '../../../shared/util/encrypt.js'
import { IUserRepository } from '../interfaces/IUserRepository.js'
import { LoginInput, UserInput, UserOutput } from '../schemas/userSchema.js'

export class UserService {
  private userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  create = async (user: UserInput): Promise<UserOutput> => {
    user.password = await encryptPassword(user.password)
    const userCreated = await this.userRepository.create(user)
    return userCreated as UserOutput
  }

  findAll = async () => {
    const users = await this.userRepository.findAll()
    const userOnlyEmailAndUsername: UserOutput[] = []
    users.forEach((user) =>
      userOnlyEmailAndUsername.push({
        username: user.username,
        email: user.email,
      }),
    )
    return userOnlyEmailAndUsername
  }

  handleLogin = async (credentials: LoginInput) => {
    const user = this.userRepository.findByLogin(credentials.username)
    console.log(user)
  }
}
