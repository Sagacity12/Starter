const CustomAPIError = require('./custom.error.js');
const {StatusCodes} = require('http-status-codes')

class BadRequestError extends CustomAPIError {
  constructor(message, StatusCodes) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError;
