
import { GetMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeGetUserMetricsUseCase(){
    const checkInRepository = new PrismaCheckInsRepository()
    const useCase = new GetMetricsUseCase(checkInRepository)

    return useCase
}