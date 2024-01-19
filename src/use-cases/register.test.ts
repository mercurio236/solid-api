import { expect, it, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUserCAse = new RegisterUseCase(userRepository)

    const { user } = await registerUserCAse.execute({
      name: 'John Doe',
      email: 'john@hotmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUserCAse = new RegisterUseCase(userRepository)

    const { user } = await registerUserCAse.execute({
      name: 'John Doe',
      email: 'john@hotmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })
  it('should not be able to register with same email twice ', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUserCAse = new RegisterUseCase(userRepository)

    const email = 'john@hotmail.com'

    await registerUserCAse.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUserCAse.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
