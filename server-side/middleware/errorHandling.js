function errorHandler(err, req, res, next) {
  errors =
    process.env.NODE_ENV === "development"
      ? err
      : {
          message: err.message,
        };
  res.status(err.status || 500);
  res.json(errors);
}

module.exports = errorHandler;
