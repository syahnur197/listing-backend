const multer = require("multer");

const storage = multer.memoryStorage();

const maxImageCount = 10;

exports.uploadImages = multer({
  storage: storage,
}).array("images", maxImageCount);
