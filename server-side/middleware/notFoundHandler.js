const createError = require("http-errors");

function notFoundHandler(req, res, next) {
  next(
    createError(404, {
      message: "404 not found😴",
    })
  );
}

module.exports = notFoundHandler;
