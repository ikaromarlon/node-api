const argon2 = require('argon2')

module.exports = {
  hash: async (password) => argon2.hash(password),
  verify: async (hash, password) => argon2.verify(hash, password)
}
