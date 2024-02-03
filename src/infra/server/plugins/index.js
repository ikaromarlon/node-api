const swagger = require('./swagger')

async function setupPlugins (fastify) {
  await Promise.all([
    swagger(fastify)
  ])
}

module.exports = { setupPlugins }
