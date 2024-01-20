import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUseCase } from '@/use-cases/autenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if(error instanceof InvalidCredentialsError){
      return reply.status(400).send({message: error.message})
    }

    throw error
  }

  return reply.status(200).send()
}
