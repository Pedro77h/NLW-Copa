import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

    const user = await prisma.user.create({
        data: {
            nome: 'John Doe',
            email: 'fulano@gmail.com',
            avatarUrl: 'https://github.com/Pedro77h.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'John Doe',
            code: 'BOL123',
            ownerId: user.id,


            participants: {
                create: {
                    userId: user.id
                }
            }

        }

    })


    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.521Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCOde: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.521Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCOde: 'US',

            guesses: {
                create: {
                    firstTeamPoints: 2 ,
                    secondTeamPoints: 1 ,

                    participants:{
                        connect:{
                            userId_poolId:{
                                userId: user.id ,
                                poolId: pool.id
                                
                            }
                        }
                    }
                }
            }
        }
    })

}

main()