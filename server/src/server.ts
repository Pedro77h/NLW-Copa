import Fastify from "fastify";
import Cors from "@fastify/cors";
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
import { poolRoutes } from "./routes/pools.routes";
import { ganeRoutes } from "./routes/game.routes";
import { userRoutes } from "./routes/user.routes";
import { guessRoutes } from "./routes/guess.routes";
import { authRoutes } from "./routes/auth";
import fastifyJwt from "@fastify/jwt";



async function bootstrap() {

    const fastify = Fastify({
        logger: true
    })


    await fastify.register(Cors, {
        origin: true,

    })

    // passar para variavel de ambiente 

    await fastify.register(fastifyJwt, {
        secret: "nlwcopa"
    })

   await fastify.register(ganeRoutes)
   await fastify.register(poolRoutes)
   await fastify.register(userRoutes)
   await fastify.register(guessRoutes)
   await fastify.register(authRoutes)








    await fastify.listen({ port: 3333,/*  host: '0.0.0.0' */ })

}


bootstrap()