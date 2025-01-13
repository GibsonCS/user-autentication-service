import { UserRepository } from '../repositories/UserRepository.js'
import { LoginInput } from '../schemas/userSchema.js'
import { comparePassword } from '../util/comparePassword.js'
import { generateJWT } from '../util/jwtGenerate.js'

const userRepository = new UserRepository()
export class AuthService {
  async handleLogin (credentials: LoginInput) {
    const user: any = await userRepository.findByLogin(credentials.username)
    if (user) {
      const passwordFromDB: string = user.password
      const isTrue = await comparePassword(credentials.password, passwordFromDB)
      if (isTrue) {
        return generateJWT({ username: user.username, roles: user.roles })
      }
    }
    return false
  }
}
