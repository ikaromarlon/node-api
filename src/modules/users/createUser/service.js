module.exports = (
  usersRepository,
  passwordHashing
) => async ({ name, email, password }) => {
  const userExists = await usersRepository.exists({ email })

  if (userExists) {
    throw new Error('User with provided email already exists')
  }

  const userData = {
    name,
    email,
    password: await passwordHashing.hash(password)
  }

  const user = await usersRepository.create(userData)

  return user
}
