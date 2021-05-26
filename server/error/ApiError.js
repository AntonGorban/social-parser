class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status || 500;
    this.message = message || "Internal Server Error";
  }

  static badRequest(message) {
    // Плохой запрос
    return new ApiError(400, message || "Bad Request");
  }

  static unauthorized(message) {
    // Не авторизован
    return new ApiError(401, message || "Unauthorized");
  }

  static forbidden(message) {
    // Запрещено
    return new ApiError(403, message || "Forbidden");
  }

  static notFound(message) {
    // Не найдено
    return new ApiError(404, message || "Not Found");
  }

  static internal(message) {
    // Внутренняя ошибка сервера
    return new ApiError(500, message || "Internal Server Error");
  }
}

module.exports = ApiError;
