

function errorHandler(err, req, res, next) {
  res.locals.erros =
    process.env.NODE_ENV === "development"
      ? err
      : {
          message: err.message,
        };
  res.status(err.status || 500);
  res.json(res.locals.erros);
}

module.exports = errorHandler;
