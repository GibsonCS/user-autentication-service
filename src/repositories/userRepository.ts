import { UserInput } from "../schemas/userSchema";
import { database } from "../database/db";
import sqlBricks from "sql-bricks";


export const createUser = async (credentials: UserInput) => {
    const { text, values } = sqlBricks.insertInto('users', credentials)
        .toParams({ placeholder: '?' })
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
}