const makeRequest = async (method, url, { data, headers } = {}) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  })

  const result = {
    status: response.status,
    data: await response.json(),
    headers: Object.fromEntries(response.headers.entries())
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
