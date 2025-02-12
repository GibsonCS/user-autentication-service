import { User } from '../entity/User.js'
import { IUserRepository } from '../interfaces/IUserRepository.js'
import { UserInput, UserOutput } from '../schemas/userSchema.js'

export class UserRepositoryMock implements IUserRepository {
  private users: UserOutput[] = []
  //   constructor(mock: UserOutput[]) {
  //     this.users = mock
  //   }

  create(credentials: UserInput): Promise<UserOutput> {
    throw new Error('Method not implemented.')
  }
  async findAll(): Promise<UserOutput[]> {
    return this.users
  }
  findByLogin(login: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
