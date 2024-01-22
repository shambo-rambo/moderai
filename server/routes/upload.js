const express = require('express');
const multer = require('multer');
const router = express.Router();

// Multer setup
const upload = multer({ dest: 'uploads/' });

router.post('/feedback/upload', upload.single('file'), async (req, res) => {
  try {
    res.status(200).json({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
