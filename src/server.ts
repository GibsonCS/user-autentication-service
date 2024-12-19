import fastify from "fastify";
import { registerRoutes } from "./routes";
import fastifyCookie from "fastify-cookie";
import { authMiddleware } from "./middlewares/authMiddleware";

const server = fastify()

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
