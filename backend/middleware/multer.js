// middleware/multerConfig.js
const multer = require('multer');

// Multer memory storage configuration
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;