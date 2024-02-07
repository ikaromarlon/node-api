const CreateUserController = require('../../../../../src/modules/users/createUser/controller')
const { faker } = require('@faker-js/faker')

const setupSut = () => {
  const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const mockDependencies = {
    createUserService: jest.fn(async () => ({ ...user, password: 'encrypted-password' }))
  }

  const sut = CreateUserController(
    mockDependencies.createUserService
  )

  return {
    sut,
    mockDependencies,
    user
  }
}

describe('Unit Test: CreateUserController', () => {
  it('Should execute createUser service and return success', async () => {
    const { sut, mockDependencies, user } = setupSut()

    const { id, ...requestData } = user

    const result = await sut({
      body: requestData
    })

    const { password, ...responseData } = user

    expect(mockDependencies.createUserService).toHaveBeenCalledTimes(1)
    expect(mockDependencies.createUserService).toHaveBeenCalledWith(requestData)
    expect(result.status).toBe(201)
    expect(result.data).toEqual(expect.objectContaining(responseData))
  })

  it('Should return error if service throws an error', async () => {
    const { sut, mockDependencies, user } = setupSut()
    mockDependencies.createUserService.mockRejectedValue(new Error('generic error'))

    const { id, ...requestData } = user

    const result = await sut({
      body: requestData
    })

    expect(mockDependencies.createUserService).toHaveBeenCalledTimes(1)
    expect(mockDependencies.createUserService).toHaveBeenCalledWith(requestData)
    expect(result.status).toBe(500)
    expect(result.data.message).toBe('generic error')
  })
})
