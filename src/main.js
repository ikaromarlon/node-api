const { getServer } = require('./infra/server')

async function main () {
  try {
    const server = getServer()
    await server.start()
    console.log('App is running at', server.getAddress())
  } catch (e) {
    console.log('App failed to start...', e)
  }
}

main()
