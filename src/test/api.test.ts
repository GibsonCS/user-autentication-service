import { describe, before, after, it } from 'node:test'
import { strictEqual, deepStrictEqual } from 'node:assert'
import { UserService } from '../modules/users/services/UserService.js'
import { UserRepositoryFactory } from '../shared/factories/UserRepositoryFactory.js'

const BASE_URL = 'http://localhost:3000/api'

const userRepository = UserRepositoryFactory.createUserRepository('prod')
const userService = new UserService(userRepository)
describe('API Workflow', () => {
  let server: any
  let token: string

  before(async () => {
    server = (await import('../server.js')).server
    await server.ready()
    console.log('Server is ready')

    const user = {
      username: 'gibson',
      password: '123456',
      email: 'gibson@gibson.com',
    }
    await userService.create(user)
  })

  it('Sucessfuly user and passeword login', async () => {
    const credentials = {
      username: 'gibson',
      password: '123456',
    }
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    token = data.token

    strictEqual(response.status, 200)
    deepStrictEqual(data.message, 'Welcome')
  })
  it('Check auth', async () => {
    const response = await fetch(`${BASE_URL}/auth/check`, {
      method: 'GET',
      headers: { Cookie: `authToken=${token}` },
      credentials: 'include',
    })
    strictEqual(response.status, 200)
  })

  after(async () => {
    console.log('Closing server...')
    await server.close()
  })
})
