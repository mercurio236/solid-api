import { UsersRepository } from '@/repositories/use-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'
import { GymRepository } from '@/repositories/gyms-respository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInRepository, private gymsRepository: GymRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym){
        throw new ResourceNotFoundError()
    }

    //calculate distance between user and gym
    

    const checkInOnsameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if(checkInOnsameDay){
        throw new Error()
    }


    const checkIn = await this.checkInsRepository.create({
        gym_id: gymId,
        user_id: userId
    })
    return {
      checkIn,
    }
  }
}
