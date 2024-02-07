const { HttpStatus } = require('../../../utils/http')

module.exports = (fastify) => {
  fastify.setErrorHandler((error, req, res) => {
    const status = error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR
    return res
      .status(status)
      .send({
        type: 'InternalServerError',
        status,
        message: error.message || 'Internal Server Error'
      })
  })
}
