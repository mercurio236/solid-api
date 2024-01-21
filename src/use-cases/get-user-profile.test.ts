import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let sut: GetUserProfileUseCase
let userRepository: InMemoryUsersRepository

// sut - system under test
describe('Get user profile Use Case', () => {
  beforeEach(() =>{
     userRepository = new InMemoryUsersRepository()
     sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get use profile', async () => {
    

   const createdUser =  await userRepository.create({
      name: 'John Doe',
      email: 'john@hotmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
     userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })
  it('should not be able to get use profile with wrong id', async () => {
    expect(() => 
        sut.execute({
            userId:'non-existing-id'
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
