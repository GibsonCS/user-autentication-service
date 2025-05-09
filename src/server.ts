import fastify from 'fastify'
import { registerRoutes } from './routes/index.js'
import fastifyCookie from '@fastify/cookie'
import { authMiddleware } from './middlewares/authMiddleware.js'
import fastifyCors from '@fastify/cors'
import { seed } from './seed.js'
import { registerSwagger } from './documentation/swagger.js'

const PORT = parseInt(process.env.PORT) || 3000

export const server = fastify()
await registerSwagger(server)

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
})

authMiddleware(server)
registerRoutes(server)

server.register(fastifyCookie)

const app = async () => {
  try {
    await server.listen({ host: '0.0.0.0', port: PORT })
    console.log(`Server is running at ${PORT ?? '3000.'}`)
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}
app()
seed()
