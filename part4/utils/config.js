require('dotenv').config() // Environment variables from dotenv library
var MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}