class ApiResponse {
  constructor(res, statusCode, data, message = 'Success') {
    this.res = res;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }

  send() {
    return this.res.status(this.statusCode).json({
      success: true,
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = ApiResponse;
