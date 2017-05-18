function ApiError(message, code) {
  this.message = message;
  this.code = code;
};
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

module.exports = ApiError;
