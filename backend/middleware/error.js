function notFound(req, res) { res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` }); }
function errorHandler(err, req, res, next) {
  if (err instanceof require('multer').MulterError) return res.status(400).json({ message: err.message });
  const status = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
  res.status(status).json({ message: status === 500 ? 'Internal server error' : err.message, ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) });
}
module.exports = { notFound, errorHandler };
