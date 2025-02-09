import { UserInput, UserOutput } from '../schemas/userSchema.js'
import sqlBricks from 'sql-bricks'
import { DatabaseSync, StatementSync } from 'node:sqlite'
import { IUserRepository } from '../interfaces/IUserRepository.js'

let lasId: number | bigint
export class UserRepository implements IUserRepository {
  private database: DatabaseSync
  constructor(database: DatabaseSync) {
    this.database = database
  }
  findByLogin = async (login: string): Promise<any> => {
    const { text, values } = sqlBricks
      .select('users.username', 'users.password', 'roles.role')
      .from('users')
      .innerJoin('user_roles')
      .on('users.id', 'user_roles.user_id')
      .innerJoin('roles')
      .on('roles.id', 'user_roles.role_id')
      .where('users.username', login)
      .toParams({ placeholder: '?' })
    const selectStatement = this.database.prepare(text)
    const result = selectStatement.all(...values)
    if (result) {
      const roles = Object.values(result)
        .filter((value) => typeof value === 'object')
        .map((v: any) => v.role)
      const { username, password }: any = result[0]
      const user = {
        username,
        roles,
        password,
      }
      return user
    }
    return false
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
