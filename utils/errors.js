// Error factory functions
const createValidationError = (message) => {
  const error = new Error(message);
  error.name = "ValidationError";
  error.statusCode = 400;
  return error;
};

const createAuthenticationError = (message) => {
  const error = new Error(message);
  error.name = "AuthenticationError";
  error.statusCode = 401;
  return error;
};

const createNotFoundError = (message) => {
  const error = new Error(message);
  error.name = "NotFoundError";
  error.statusCode = 404;
  return error;
};

createConflictError = (message) => {
  const error = new Error(message);
  error.name = "ConflictError";
  error.statusCode = 409;
  return error;
};

module.exports = {
    createValidationError,
    createAuthenticationError,
    createNotFoundError,
    createConflictError
}
