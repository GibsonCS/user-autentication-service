import { DatabaseSync } from 'node:sqlite'
import sqlBricks from 'sql-bricks'

export const database = new DatabaseSync('./src/shared/database/db.sqlite')
const runSedd = () => {
  database.exec(`
        DROP TABLE IF EXISTS user_roles;
        DROP TABLE IF EXISTS roles;
        DROP TABLE IF EXISTS users;
    `)
  database.exec(`
        CREATE TABLE users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL
        ) STRICT;
    `)
  database.exec(`
        CREATE TABLE roles(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL
        ) STRICT;
    `)
  database.exec(`
        CREATE TABLE user_roles(
            user_id INTEGER NOT NULL,
            role_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, role_id),
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (role_id) REFERENCES roles (id)
        ) STRICT;
        `)

  insert({ table: 'roles', items: { role: 'user' } })
  insert({ table: 'roles', items: { role: 'admin' } })
}
runSedd()

export function insert({ table, items }: any) {
  const { text, values } = sqlBricks.insertInto(table, items).toParams({ placeholder: '?' })

  const insertStatement = database.prepare(text)
  insertStatement.run(...values)
}
