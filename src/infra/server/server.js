const Fastify = require('fastify')
const { setupMiddlewares } = require('./middlewares')

let srvInstance = null

async function getServer () {
  if (!srvInstance) {
    srvInstance = Fastify()
    await setupMiddlewares(srvInstance)
  }

  const start = async () => {
    await srvInstance.listen({ port: 3000 })
  }

  const isConnected = () => {
    return !!srvInstance.server?._handle
  }

  const getAddress = () => {
    if (!isConnected()) {
      throw new Error('Server is not connected')
    }
    const [{ address, port }] = srvInstance.addresses()
    return `http://${address}:${port}`
  }

  const shutDown = async () => {
    await srvInstance.close()
  }

  return {
    start,
    isConnected,
    getAddress,
    shutDown
  }
}

module.exports = { getServer }
