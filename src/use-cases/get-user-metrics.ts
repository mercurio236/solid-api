import { CheckInRepository } from '@/repositories/check-ins-repository'

interface GetMetricsUseCaseRequest {
  userId: string
}

interface GetMetricsUseCaseResponse {
  checkInCount: number
}

export class GetMetricsUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetMetricsUseCaseRequest): Promise<GetMetricsUseCaseResponse> {
    const checkInCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInCount,
    }
  }
}
