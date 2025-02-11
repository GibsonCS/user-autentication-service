import { UserInput, UserOutput } from '../schemas/userSchema.js'
import sqlBricks from 'sql-bricks'
import { DatabaseSync, StatementSync } from 'node:sqlite'
import { IUserRepository } from '../interfaces/IUserRepository.js'
import { User } from '../entity/User.js'

let lasId: number | bigint
export class UserRepository implements IUserRepository {
  private database: DatabaseSync
  constructor(database: DatabaseSync) {
    this.database = database
  }
  findByLogin = async (login: string): Promise<User | null> => {
    const { text, values } = sqlBricks
      .select('users.id', 'users.username', 'users.password', 'users.email', 'roles.role')
      .from('users')
      .innerJoin('user_roles')
      .on('users.id', 'user_roles.user_id')
      .innerJoin('roles')
      .on('roles.id', 'user_roles.role_id')
      .where('users.username', login)
      .toParams({ placeholder: '?' })
    const selectStatement = this.database.prepare(text)
    const [result]: any = selectStatement.all(...values)
    const user: User = {
      id: result.id,
      username: result.username,
      password: result.password,
      email: result.email,
      role: result.role,
    }
    return user
  }

  async insertUserRole(id: number | bigint): Promise<boolean> {
    const roles = [
      {
        user_id: `${lasId++}`,
        role_id: 1,
      },
    ]
    const { text, values } = sqlBricks
      .insertInto('user_roles', roles)
      .toParams({ placeholder: '?' })
    const insertStatement = this.database.prepare(text)
    insertStatement.run(...values)
    if (insertStatement) {
      return true
    }
  }

  async create(credentials: UserInput): Promise<UserOutput | null> {
    const { text, values } = sqlBricks
      .insertInto('users', credentials)
      .toParams({ placeholder: '?' })
    const insertStatement = this.database.prepare(text)
    const result = insertStatement.run(...values)
    lasId = result.lastInsertRowid
    this.insertUserRole(lasId)
    return result as UserOutput
  }

  findAll = async (): Promise<UserOutput[]> => {
    const { text } = sqlBricks.select().from('users').toParams()
    const selectStatement: StatementSync = this.database.prepare(text)
    const result: unknown[] = selectStatement.all()
    const cleanResult: any[] = result.map(({ ...row }: any) => row) as any[]
    return cleanResult
  }
}
