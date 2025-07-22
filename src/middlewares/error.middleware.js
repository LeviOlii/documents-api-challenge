const ApiError = require('../utils/apiError');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Erro não tratado
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
};

module.exports = errorHandler;