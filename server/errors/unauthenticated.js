const CustomAPIError = require("./custom.error.js");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomAPIError {
  constructor(message, StatusCodes) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
