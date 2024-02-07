const errorHandler = require('./errorHandler')
const notFoundHandler = require('./notFoundHandler')

function setupErrorHandlers (fastify) {
  errorHandler(fastify)
  notFoundHandler(fastify)
}

module.exports = { setupErrorHandlers }
