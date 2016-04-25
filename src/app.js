'use strict';
const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const limits = { fileSize: 5000000 };
const upload = multer({ storage, limits });
const uploadHandler = upload.single('sourcefile');

const app = express();

app.post('/', (req, res) => {
  uploadHandler(req, res, (err) => {
    if (err) return res.json({ error: err });
    return res.json({
      filename: req.file.originalname,
      bytes: req.file.buffer.length
    });
  });
});

module.exports.app = app;
