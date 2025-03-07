// backend/routes/uploadRoutes.js
import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configure storage for Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Folder to store images
  },
  filename(req, file, cb) {
    // Example: image-1664612333270.jpg
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Validate file type (only jpg/jpeg/png)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/i;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb({ message: 'Images only!' });
  }
}

// Set up Multer
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image uploaded successfully',
    image: `/${req.file.path}`,
  });
});

export default router;