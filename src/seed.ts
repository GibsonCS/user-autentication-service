import { UserInput } from './modules/users/schemas/userSchema.js'
import { UserService } from './modules/users/services/UserService.js'
import { UserRepositoryFactory } from './shared/factories/UserRepositoryFactory.js'

const userRepository = UserRepositoryFactory.createUserRepository("prod")
const userService = new UserService(userRepository)
export const seed = async () => {
  const user: UserInput = {
    username: 'teste',
    password: 'teste',
    email: 'teste@teste.com',
  }
  await userService.create(user);
}
