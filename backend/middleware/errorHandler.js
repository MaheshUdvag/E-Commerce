export const invalidRequest = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  const response =
    process.env.NODE_ENV === "local"
      ? {
          message: err.message,
          name: err.name,
          stack: err.stack,
        }
      : {
          message: err.message,
          name: err.name,
        };
  res.send(response);
};

export const requestNotFound = (req, res, next) => {
  const error = new Error(`The specified URL ${req.originalUrl} is invalid`);
  res.status(404);
  next(error);
};
