const cors = require('./cors')
const errorHandler = require('./errorHandler')
const notFoundHandler = require('./notFoundHandler')

async function setupMiddlewares (fastify) {
  await Promise.all([
    cors(fastify),
    errorHandler(fastify),
    notFoundHandler(fastify)
  ])
}

module.exports = { setupMiddlewares }
