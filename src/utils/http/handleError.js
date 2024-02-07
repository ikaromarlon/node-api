const HttpStatus = require('./HttpStatus')

/**
 * Handle and parse error responses.
 *
 * @param {Error} error - The error object containing information about the error.
 * @param {number} [status=500] - The HTTP status code for the error response. Defaults to 500 (Internal Server Error).
 * @param {Object} [headers={}] - Additional headers to include in the error response.
 *
 * @returns {Object} An object representing the HTTP error response.
 *
 * @property {Object} data - The data to be included in the error response body.
 * @property {string} data.message - The error message.
 * @property {number} status - The HTTP status code for the error response.
 * @property {Object} headers - Additional headers included in the error response.
 */
module.exports = function handleError (
  error,
  status = HttpStatus.INTERNAL_SERVER_ERROR,
  headers = {}
) {
  const data = {
    message: error.message || 'Internal Server Error'
  }

  return {
    data,
    status,
    headers
  }
}
