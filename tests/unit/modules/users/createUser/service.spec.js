const CreateUserService = require('../../../../../src/modules/users/createUser/service')
const { faker } = require('@faker-js/faker')

const setupSut = () => {
  const userData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const hashedPasword = 'encrypted-password'

  const userCreated = {
    id: faker.string.uuid(),
    ...userData,
    password: hashedPasword
  }

  const mockDependencies = {
    usersRepository: {
      create: jest.fn(async (userData) => userCreated),
      exists: jest.fn(async () => false)
    },
    passwordHashing: {
      hash: jest.fn(async (password) => hashedPasword)
    }
  }

  const sut = CreateUserService(
    mockDependencies.usersRepository,
    mockDependencies.passwordHashing
  )

  return {
    sut,
    mockDependencies,
    userData,
    userCreated,
    hashedPasword
  }
}

describe(`Unit Test: ${CreateUserService.name}`, () => {
  it('Should create a new user', async () => {
    const { sut, mockDependencies, userData, userCreated, hashedPasword } = setupSut()

    const result = await sut(userData)

    expect(mockDependencies.usersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mockDependencies.passwordHashing.hash).toHaveBeenCalledWith(userData.password)
    expect(mockDependencies.usersRepository.create).toHaveBeenCalledWith({ ...userData, password: hashedPasword })
    expect(result).toEqual(userCreated)
  })

  it('Should throws an error if user already exists', async () => {
    const { sut, mockDependencies, userData } = setupSut()
    mockDependencies.usersRepository.exists.mockResolvedValueOnce(true)

    const result = sut(userData)

    await expect(result).rejects.toThrow('User with provided email already exists')

    expect(mockDependencies.usersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mockDependencies.passwordHashing.hash).toHaveBeenCalledTimes(0)
    expect(mockDependencies.usersRepository.create).toHaveBeenCalledTimes(0)
  })
})
