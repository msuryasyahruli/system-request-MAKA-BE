const multer = require('multer');
const { failed } = require('../helper/common');

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length']);
    const maxSize = 5 * 1024 * 1024;
    if (fileSize > maxSize) {
      const error = {
        message: 'File size exceeds 5 MB',
      };
      return cb(error, false);
    }
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      const error = {
        message: 'File must be a PDF',
      };
      cb(error, false);
    }
  },
});

// middleware
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('import_documents');
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, 400, err.message);
    } else {
      next();
    }
  });
};

module.exports = upload;
