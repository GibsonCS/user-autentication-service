import { select } from './database/db.js';
import fastify from "fastify";
import { registerRoutes } from "./routes";

const server = fastify()

registerRoutes(server);

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
