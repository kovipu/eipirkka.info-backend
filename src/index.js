const express = require('express');
const multer = require('multer');

const VisionService = require('./services/VisionService');

const app = express();
const visionService = VisionService();
const upload = multer({ dest: 'tmp/' });

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/predict', upload.single('image'), (req, res) => {
  const base64data = req.file;
  visionService.analyzeImage(base64data)
  res.send('OK')
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
