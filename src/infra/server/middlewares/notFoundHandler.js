const { HttpStatus } = require('../../../utils/http')

module.exports = async (fastify) => {
  fastify.setNotFoundHandler((req, res) => {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send({ message: `${req.method} ${req.url} not found` })
  })
}
