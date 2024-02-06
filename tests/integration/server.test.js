const { getServer } = require('../../src/infra/server')
const { getRequester } = require('../../src/utils/helpers/request')

describe('Integration Test: Server', () => {
  let requester
  let server
  let url
  const routePrefix = '/api'

  beforeAll(async () => {
    requester = getRequester()
    server = await getServer()
    await server.start()
    url = server.getAddress()
  })

  afterAll(async () => {
    await server.shutDown()
  })

  describe('Errors', () => {
    test('Should return status 404 with not found response data', async () => {
      const response = await requester.get(`${url}${routePrefix}/non-existing-route`)

      expect(response.status).toBe(404)
      expect(response.data).toEqual({
        type: 'NotFoundException',
        status: 404,
        message: 'There is no corresponding method GET and route /api/non-existing-route'
      })
    })
  })

  describe('Plugins', () => {
    describe('Swagger', () => {
      test('Shoul call Swagger route and return suscess', async () => {
        const response = await requester.get(`${url}/docs`, {
          headers: {
            Accept: 'text/html'
          }
        })

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8')
        expect(response.data).toBeTruthy()
      })
    })
  })
})
