import { describe, before, after, it } from 'node:test'
import { strictEqual, deepStrictEqual } from 'node:assert'
import { resolve } from 'node:path'
import { UserService } from '../services/UserService.js'

const BASE_URL = 'http://localhost:3000/api'
const userService = new UserService()

describe('API Workflow', () => {
    let server: any
    before(async () => {
        server = (await import('../server.js')).server
        await server.ready()
        console.log('Server is ready')
    })
    before(async () => {
        const user = {
            username: "gibson",
            password: "123456",
            email: "gibson@gibson.com"
        }
        await userService.create(user)
    })

    it('Sucessfuly user and passeword login', async () => {
        const credentials = {
            username: "gibson",
            password: "123456",
        }
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(credentials),
        })
        const data = await response.json()
        strictEqual(response.status, 200)
        deepStrictEqual(data.message, 'Wellcome')
    })

    after(async () => await server.close())
})