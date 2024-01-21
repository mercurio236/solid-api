import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './autenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let sut: AuthenticateUseCase
let userRepository: InMemoryUsersRepository

// sut - system under test
describe('Register Use Case', () => {
  beforeEach(() =>{
     userRepository = new InMemoryUsersRepository()
     sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    

    await userRepository.create({
      name: 'John Doe',
      email: 'john@hotmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john@hotmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {

    await expect(() =>
      sut.execute({
        email: 'john@hotmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {

    await userRepository.create({
        name: 'John Doe',
        email: 'john@hotmail.com',
        password_hash: await hash('123456', 6),
      })

    await expect(() =>
      sut.execute({
        email: 'john@hotmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
