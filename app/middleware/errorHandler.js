class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { status, statusCode, message } = err;
  res.status(statusCode).json({
    status,
    statusCode,
    message
  });
};
const status = {
  SUCCESS: "SUCCESS",
  CLIENT_ERROR: "CLIENT_ERROR",
  SERVER_ERROR: "SERVER_ERROR"
};

module.exports = {
  ErrorHandler,
  handleError,
  status
};
