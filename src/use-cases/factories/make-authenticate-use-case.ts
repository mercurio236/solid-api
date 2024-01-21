import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { AuthenticateUseCase } from "../autenticate"

export function makeAuthenticateUseCase(){
    const usersRepository = new PrismaUserRepository()
    const autenticate = new AuthenticateUseCase(usersRepository)

    return autenticate
}