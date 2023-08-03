const errorMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    return res.status(500).json({
      status: err.statusCode || 500,
      message: err.message,
      err,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    if (err.name === "ValidationError") {
      const error = Object.values(err.errors)[0].message;
      return res.status(400).json({
        status: "fail",
        message: error,
      });
    }
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: "fail",
        message: err.message,
      });
    } else {
      res.status(500).json({
        status: "fail",
        message: "Something went really wrong! 😢",
      });
    }
  }
};

module.exports = errorMiddleware;
