import { UserInput } from '../schemas/userSchema.js'
import { database } from '../database/db.js'
import sqlBricks from 'sql-bricks'
import { UserEntity } from '../interfaces/UserEntity.js'
import { StatementSync } from 'node:sqlite'

export class UserRepository {
  async create(credentials: UserInput) {
    const { text, values } = sqlBricks
      .insertInto('users', credentials)
      .toParams({ placeholder: '?' })
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
    this.insertUserRole()
  }

  async insertUserRole() {
    const roles = [
      {
        user_id: 1,
        role_id: 1
      }
    ]
    const { text, values } = sqlBricks
      .insertInto('user_roles', roles)
      .toParams({ placeholder: '?' })
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
  }

  async findByLogin(login: string) {
    const { text, values } = sqlBricks
      .select('users.username', 'users.password', 'roles.role')
      .from('users')
      .innerJoin('user_roles')
      .on('users.id', 'user_roles.user_id')
      .innerJoin('roles')
      .on('roles.id', 'user_roles.role_id')
      .where('users.username', login)
      .toParams({ placeholder: '?' })
    const selectStatement = database.prepare(text)
    const result = selectStatement.all(...values)

    if (result) {
      const roles = Object.values(result)
        .filter(value => typeof value === 'object')
        .map((v: any) => v.role)
      const { username, password }: any = result[0]
      const user = {
        username,
        roles,
        password
      }
      return user
    }
    return false
  }

  async findAll() {
    const { text } = sqlBricks.select().from('users').toParams()
    const selectStatement: StatementSync = database.prepare(text)
    const result: unknown[] = selectStatement.all()
    const cleanResult: UserEntity[] = result.map(({ ...row }) => row) as UserEntity[]
    return cleanResult
  }
}
