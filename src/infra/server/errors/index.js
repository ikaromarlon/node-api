const errorHandler = require('./errorHandler')
const notFoundHandler = require('./notFoundHandler')

async function setupErrors (fastify) {
  await Promise.all([
    errorHandler(fastify),
    notFoundHandler(fastify)
  ])
}

module.exports = { setupErrors }
