import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

/* const userRepository = new InMemoryUsersRepository()
const registerUserCAse = new RegisterUseCase(userRepository) */

let checkInRepository: InMemoryCheckInsRespository
let sut: CheckInUseCase
describe('Check-in Use Case', () => {

  beforeEach(() =>{
    checkInRepository = new InMemoryCheckInsRespository()
    sut = new CheckInUseCase(checkInRepository)
  })
  it('should be able to check in', async () => {
   

    const { checkIn } = await sut.execute({
      gymId:'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
