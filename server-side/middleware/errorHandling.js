

function errorHandler(err, req, res, next) {
  res.locals.errors =
    process.env.NODE_ENV === "development"
      ? err
      : {
          message: err.message,
        };
  res.status(err.status || 500);
  res.json(res.locals.errors);
}

module.exports = errorHandler;
