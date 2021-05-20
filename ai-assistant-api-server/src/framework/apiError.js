class ApiError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest)
      return 400;

    if (this instanceof NotFound)
      return 404;

    if (this instanceof UnAuthorized)
      return 401;

    return 500;
  }
}

class BadRequest extends ApiError {}
class NotFound extends ApiError {}
class UnAuthorized extends ApiError {}

module.exports = {
  BadRequest,
  NotFound,
  ApiError,
  UnAuthorized
};