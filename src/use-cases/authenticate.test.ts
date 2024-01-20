import { expect, it, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './autenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// sut - system under test
describe('Register Use Case', () => {
  it('should be able to authenticate', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepository)

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
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await expect(() =>
      sut.execute({
        email: 'john@hotmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepository)

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
