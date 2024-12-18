import { UserInput } from "../schemas/userSchema.js";
import { database } from "../database/db.js";
import sqlBricks from "sql-bricks";
import { User } from "../interfaces/user.interface.js";

export const createUser = async (credentials: UserInput) => {
    const { text, values } = sqlBricks.insertInto('users', credentials)
        .toParams({ placeholder: '?' })
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
}

export const getUserByLogin = async (login: string) => {
    const { text, values } = sqlBricks.select()
        .from('users')
        .where({ username: login })
        .toParams({ placeholder: '?' })
    const selectStatement = database.prepare(text)
    const result = selectStatement.get(...values) as User
    const user: User = { ...result }
    return user
}