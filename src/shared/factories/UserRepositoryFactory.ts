import { database } from '../database/db.js'
import { UserRepository } from '../../modules/users/repositories/UserRepository.js'
import { UserRepositoryMock } from '../../modules/users/repositories/UserRepositoryMock.js'

export class UserRepositoryFactory {
  static createUserRepository = (type: 'prod' | 'test'): UserRepository | UserRepositoryMock => {
    if (type === 'prod') {
      return new UserRepository(database)
    } else {
      return new UserRepositoryMock()
    }
  }
}
