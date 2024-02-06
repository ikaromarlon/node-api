const parseResponseData = async (headers, response) => {
  const strategies = {
    'application/json': async () => response.json(),
    'text/html': async () => response.text()
  }
  const strategy = strategies[headers?.Accept ?? 'application/json']
  return strategy()
}

const makeRequest = async (method, url, { data, headers } = {}) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  })

  const responseData = parseResponseData(headers, response)

  const result = {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    data: await responseData
  }

  return result
}

function getRequester () {
  return {
    post: async (url, options) => await makeRequest('POST', url, options),
    get: async (url, options) => await makeRequest('GET', url, options),
    put: async (url, options) => await makeRequest('PUT', url, options),
    patch: async (url, options) => await makeRequest('PATCH', url, options)
  }
}

module.exports = { getRequester }
