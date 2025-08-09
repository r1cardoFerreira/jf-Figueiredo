const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../..', 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, Date.now() + '-' + originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;