const { HttpStatus } = require('../../../utils/http')

module.exports = async (fastify) => {
  fastify.setNotFoundHandler((req, res) => {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send({
        type: 'NotFoundException',
        status: HttpStatus.NOT_FOUND,
        message: `There is no corresponding method ${req.method} and route ${req.url}`
      })
  })
}
