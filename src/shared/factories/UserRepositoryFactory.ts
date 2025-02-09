import { database } from '../database/db.js'
import { UserRepository } from '../../modules/users/repositories/UserRepository.js'

export class UserRepositoryFactory {
  static createUserRepository = (type: 'prod' | 'test'): UserRepository => {
    if (type === 'prod') {
      return new UserRepository(database)
    } else {
    }
  }
}
