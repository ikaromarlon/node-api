const Server = require('./infra/server')

async function main () {
  try {
    const server = Server()
    await server.start()
    console.log('App is running at', server.getAddress())
  } catch (e) {
    console.log('App failed to start...', e)
  }
}

main()
