import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRespository
let sut: GetMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRespository()
    sut = new GetMetricsUseCase(checkInsRepository)
  })
  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
        gym_id: 'gym-01',
        user_id:'user-01'
    })
    await checkInsRepository.create({
        gym_id: 'gym-02',
        user_id:'user-01'
    })

    const { checkInCount } = await sut.execute({
        userId:'user-01'
    })

    expect(checkInCount).toEqual(2)
   
  })

})
