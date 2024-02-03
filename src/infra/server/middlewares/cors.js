const fastifyCors = require('@fastify/cors')

module.exports = async (fastify) => {
  await fastify.register(fastifyCors, { origin: '*' })
}
