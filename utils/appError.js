class AppError extends Error {
  constructor(message, statuseCode) {
    super(message);
    this.statuseCode = statuseCode;
    this.status = `${statuseCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
