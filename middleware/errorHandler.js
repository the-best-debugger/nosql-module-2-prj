// Centralized error handler middleware
module.exports = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err && err.stack ? err.stack : err);
  const isProd = process.env.NODE_ENV === 'production';
  const payload = {
    success: false,
    message: isProd ? 'Internal Server Error' : (err && err.message) || 'Internal Server Error',
  };
  if (!isProd && err && err.details) payload.details = err.details;
  res.status(500).json(payload);
};
