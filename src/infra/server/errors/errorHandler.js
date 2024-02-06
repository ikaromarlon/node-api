const { HttpStatus } = require('../../../utils/http')

module.exports = async (fastify) => {
  fastify.setErrorHandler((error, req, res) => {
    return res
      .status(error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .send({
        type: 'InternalServerErrorException',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      })
  })
}
