const multer = require("multer");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (_req, file, cb) => {
  // allow jpeg, jpg, png and gif extensions only
  if (["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = { fileSize: 1024 * 1024 * 500 };  // limit file size to 500MB 

const upload = multer({
  storage,
  limits,
  fileFilter
});

module.exports = upload;
