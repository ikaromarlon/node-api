const fs = require('node:fs')
const fastifySwagger = require('@fastify/swagger')
const fastifySwaggerUi = require('@fastify/swagger-ui')
const swaggerOptions = require('../../../../docs/swagger/swagger.json')

module.exports = async (fastify) => {
  await fastify.register(fastifySwagger, swaggerOptions)

  await fastify.register(fastifySwaggerUi, {
    routePrefix: 'docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true
    },
    logo: {
      type: 'image/png',
      content: fs.readFileSync('./docs/assets/logo.png')
    },
    theme: {
      favicon: [
        {
          filename: 'favicon.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
          content: fs.readFileSync('./docs/assets/favicon.png')
        }
      ]
    }
  })
}
