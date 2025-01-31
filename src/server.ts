import fastify from "fastify";
import { registerRoutes } from "./routes/index.js";
import fastifyCookie from "@fastify/cookie";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import fastifyCors from "@fastify/cors";
import { seed } from "./seed.js";

export const server = fastify()
server.register(fastifyCors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
})

authMiddleware(server)
registerRoutes(server);

server.register(fastifyCookie)

const app = async () => {
    try {
        await server.listen({ port: 3000 })
        console.log('Server is running at 3000')
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}
app()
seed()

