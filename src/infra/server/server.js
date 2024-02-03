const Fastify = require('fastify')

let srvInstance = null

function Server () {
  if (!srvInstance) {
    srvInstance = Fastify()
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

module.exports = Server
