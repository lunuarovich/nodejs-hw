import { isCelebrateError } from 'celebrate';
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const validationError = err.details.values().next().value;

    return res.status(400).json({
      message: validationError?.message || 'Validation error',
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  return res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.stack,
  });
};
