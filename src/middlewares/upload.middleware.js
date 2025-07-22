const multer = require('multer');
const ApiError = require('../utils/apiError');
const fs = require('fs');
const path = require('path');

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

// Modifique o fileFilter para:
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'text/csv', 'text/comma-separated-values'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Apenas arquivos PDF e CSV são permitidos'), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});