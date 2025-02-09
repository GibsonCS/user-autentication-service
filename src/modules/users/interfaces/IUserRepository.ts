import { UserInput, UserOutput } from '../schemas/userSchema.js'

export interface IUserRepository {
  create(credentials: UserInput): Promise<UserOutput>
  findAll(): Promise<UserOutput[]>
  findByLogin(login: string): Promise<any>
}
