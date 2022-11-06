import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import authenticate from "../plugins/authenticate"
import { z } from "zod"



export async function ganeRoutes(fastify: FastifyInstance) {


    fastify.get('/pools/:id/games', {
        onRequest: [authenticate]
    }, async (req, res) => {

        const getPoolParams = z.object({
            id: z.string()
        })

        const { id } = getPoolParams.parse(req.params)


        const games = await prisma.game.findMany({
            orderBy: {
                date: 'desc'
            },
            include: {
                guesses: {
                    where: {
                        participants: {
                            userId: req.user.sub,
                            poolId: id
                        }
                    }
                }
            }
        })

        return {
        games : games.map(game =>{
            return {
                ...game , 
                guess: game.guesses.length > 0 ? game.guesses[0] : null ,
                guesses: undefined
            }
        })

        }

    })


}