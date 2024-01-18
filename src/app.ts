import fastify from 'fastify'
import {z} from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()



app.post('/users', async (req, reply) =>{
    const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
    })

    const {name, email, password} = registerBodySchema.parse(req.body) // usando o parse ele evita que o código abaixo execute

    await prisma.user.create({
        data:{
            name,
            email,
            password_hash: password
        }
    })

    return reply.status(201).send()

})
