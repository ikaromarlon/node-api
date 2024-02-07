const HttpStatus = require('./HttpStatus')

/**
 * Handle and parse success HTTP responses.
 *
 * @param {Object} data - The data to be included in the response body.
 * @param {number} [status=200] - The HTTP status code for the response. Defaults to 200 (OK).
 * @param {Object} [headers={}] - Additional headers to include in the response.
 *
 * @returns {Object} An object representing the HTTP response.
 *
 * @property {Object} data - The data to be included in the response body.
 * @property {number} status - The HTTP status code for the response.
 * @property {Object} headers - Additional headers included in the response.
 */
module.exports = function handleSucess (
  data,
  status = HttpStatus.OK,
  headers = {}
) {
  return {
    data,
    status,
    headers
  }
}
