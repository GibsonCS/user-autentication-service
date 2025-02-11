import { encryptPassword } from '../../../shared/util/encrypt.js'
import { IUserRepository } from '../interfaces/IUserRepository.js'
import { LoginInput, UserInput, UserOutput } from '../schemas/userSchema.js'
import { generateJWT } from '../../../shared/util/jwtGenerate.js'
import { User } from '../entity/User.js'
import { comparePassword } from '../../../shared/util/comparePassword.js'

export class UserService {
  private userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  registerUser = async (user: UserInput): Promise<UserOutput> => {
    user.password = await encryptPassword(user.password)
    const userCreated = await this.userRepository.create(user)
    return userCreated as UserOutput
  }

  getUsers = async () => {
    const users = await this.userRepository.findAll()
    const userOnlyEmailAndUsername: UserOutput[] = users.map(({ username, email }) => ({
      username,
      email,
    }))
    return userOnlyEmailAndUsername
  }

  loginUser = async (credentials: LoginInput): Promise<string> => {
    const user: User = await this.userRepository.findByLogin(credentials.username)
    if (!user) {
      return null
    }
    const isMatch = await comparePassword(credentials.password, user.password)
    if (isMatch) {
      const jwt = generateJWT({
        role: user.role,
      })
      return jwt
    }
    return null
  }
}
