import { UserInput } from "../schemas/userSchema.js";
import { database } from "../database/db.js";
import sqlBricks from "sql-bricks";
import { User } from "../interfaces/user.interface.js";
import { StatementSync } from "node:sqlite";

export const createUser = async (credentials: UserInput) => {
    const { text, values } = sqlBricks.insertInto('users', credentials)
        .toParams({ placeholder: '?' })
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
    addUserRoleToUser()
}

export const addUserRoleToUser = async () => {
    const { text, values } = sqlBricks.insertInto('user_roles', [{ user_id: 1, role_id: 1 }, { user_id: 1, role_id: 2 }]).toParams({ placeholder: '?' })
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
}

export const getUserByLogin = async (login: string) => {
    const { text, values } = sqlBricks.select('users.username', 'users.password', 'roles.role',)
        .from('users').innerJoin('user_roles').on('users.id', 'user_roles.user_id').innerJoin('roles').on('roles.id', 'user_roles.role_id')
        .where('users.username', login)
        .toParams({ placeholder: '?' })
    const selectStatement = database.prepare(text)
    const result = selectStatement.all(...values)

    if (result) {
        const roles = Object.values(result).filter((value) => typeof value === 'object').map((v: any) => v.role)
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

export const getUsers = async () => {
    const { text } = sqlBricks.select().from('users').toParams()
    const selectStatement: StatementSync = database.prepare(text)
    const result: unknown[] = selectStatement.all()
    const cleanResult: User[] = result.map(({ ...row }) => row) as User[]
    return cleanResult
}