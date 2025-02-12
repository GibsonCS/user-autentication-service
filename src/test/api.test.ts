import { describe, before, after, it } from 'node:test'
import { strictEqual, deepStrictEqual } from 'node:assert'
import { UserService } from '../modules/users/services/UserService.js'
import { UserRepositoryFactory } from '../shared/factories/UserRepositoryFactory.js'
import { FastifyInstance } from 'fastify'
import dotenv from 'dotenv'
import { LoginInput, UserInput } from '../modules/users/schemas/userSchema.js'

dotenv.config()
const BASE_URL = process.env.BASE_URL

const userRepository = UserRepositoryFactory.createUserRepository('prod')
const userService = new UserService(userRepository)

describe('API Workflow', () => {
  let server: FastifyInstance
  let token: string

  before(async () => {
    server = (await import('../server.js')).server
    await server.ready()
    console.log('Server is ready')
  })

  it('Should return 500 if credentials is not valid', async () => {
    const user: UserInput = {
      username: 'teste',
      password: 'teste',
      email: 'testesd@gdd',
    }

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    strictEqual(response.status, 500)
    deepStrictEqual(data, {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Verify input data and try again',
    })
  })

  it('Should return 201 if user is created', async () => {
    const user: UserInput = {
      username: 'teste',
      password: 'teste',
      email: 'teste@teste.com',
    }

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    strictEqual(response.status, 201)
    deepStrictEqual(data, { message: `Usuário ${user.username} criado com sucesso!` })
  })

  it('Should return 401 if user unauthorized', async () => {
    const credentials: LoginInput = {
      username: 'teste',
      password: 'asd',
    }
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()
    strictEqual(response.status, 401)
    deepStrictEqual(data, { message: 'Verifique as credencias.' })
  })

  it('Should return 200 if login sucessfuly', async () => {
    const credentials: LoginInput = {
      username: 'teste',
      password: 'teste',
    }

    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    strictEqual(response.status, 200)
    const [authToken] = response.headers.getSetCookie()
    token = authToken
    deepStrictEqual(data, { username: 'teste', role: 'user' })
  })

  it('Should return 200 if users has found', async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: { Cookie: token },
    })
    strictEqual(response.status, 200)
  })

  it('Should return 401 if route is not authorized', async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
    })
    const data = await response.json()
    strictEqual(response.status, 401)
    deepStrictEqual(data, { message: 'Unauthorized' })
  })

  it('Should return 200 if route was authorized', async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: { Cookie: token },
    })
    const data = await response.json()
    strictEqual(response.status, 200)
    deepStrictEqual(data, [
      { username: 'teste', email: 'teste@teste.com' },
      { username: 'teste', email: 'teste@teste.com' },
    ])
  })

  it('Should return 401 if user has no token for auth route', async () => {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'GET',
    })
    strictEqual(response.status, 401)
  })

  it('Should return status code 200 and role if user been auth', async () => {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'GET',
      headers: { Cookie: token },
    })
    const data = await response.json()
    strictEqual(response.status, 200)
    deepStrictEqual(data, { role: 'user' })
  })

  after(async () => {
    console.log('Closing server...')
    await server.close()
  })
})
