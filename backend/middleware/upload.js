const multer = require('multer');
const storage = multer.memoryStorage();
module.exports = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => {
  if (!/^image\/(jpeg|png|webp|jpg)$/.test(file.mimetype)) {
    const error = new Error('Only JPG, PNG, and WEBP images are allowed');
    error.statusCode = 400;
    return cb(error);
  }
  cb(null, true);
} });
