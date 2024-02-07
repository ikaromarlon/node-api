const { handleSuccess, handleError, HttpStatus } = require('../../../utils/http')

module.exports = (
  createUserService
) => {
  const handle = async ({ body }) => {
    try {
      const userData = {
        name: body.name,
        email: body.email,
        password: body.password
      }

      const { password, ...user } = await createUserService(userData)

      return handleSuccess(user, HttpStatus.CREATED)
    } catch (e) {
      return handleError(e)
    }
  }

  return handle
}
