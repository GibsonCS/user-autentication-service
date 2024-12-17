import { DatabaseSync } from 'node:sqlite'
// import sqlBricks from 'sql-bricks'

export const database = new DatabaseSync('./src/database/db.sqlite')

const runSedd = () => {
    database.exec(`
        DROP TABLE IF EXISTS users
    `)
    database.exec(`
        CREATE TABLE users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL
        ) STRICT
    `)
}
runSedd()


// export const select = (query: string) => {
//     return database.prepare(query).all()
// }

// export function insert({ table, items }: any) {
//     const { text, values } = sqlBricks.insertInto(table, items)
//         .toParams({ placeholder: '?' })

//     const insertStatement = database.prepare(text)
//     insertStatement.run(...values)
// }

// runSedd([
//     {
//         username: 'gibson',
//         password: 'teste',
//         email: 'gb@gb.com'
//     },
//     {
//         username: 'amanda',
//         password: 'amd',
//         email: 'am@d.com.br'
//     },
//     {
//         username: 'xuxa',
//         password: 'silva',
//         email: 'z@gmail.com'
//     },
// ])