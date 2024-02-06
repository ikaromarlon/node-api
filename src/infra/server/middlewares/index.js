const cors = require('./cors')

async function setupMiddlewares (fastify) {
  await Promise.all([
    cors(fastify)
  ])
}

module.exports = { setupMiddlewares }
