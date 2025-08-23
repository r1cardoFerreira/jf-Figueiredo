const multer = require('multer');
const path = require('path');

// Lista branca de extensões permitidas
const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../..', 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {

    originalname = path.basename(file.originalname); 

    let safeName = originalname.replace(/[^\p{L}\p{N}._-]/gu, "_");

    safeName = safeName.substring(0, 100);

    const ext = path.extname(safeName).toLowerCase();
    if (!allowedExts.includes(ext)) {
      return cb(new Error("Extensão de ficheiro não permitida"), null);
    }

    cb(null, Date.now() + '-' + safeName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, 
    files: 15                   
  }
});

module.exports = upload;