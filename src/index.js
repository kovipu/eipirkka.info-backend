const express = require('express');
const VisionService = require('./services/VisionService');
const multer = require('multer');

const app = express();
const visionService = VisionService();
const upload = multer({dest: 'tmp/'});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

// 
app.post('/image', upload.single('image'), (req, res) => {
  console.log(req.body);
  const base64data = req.file;
  const response = visionService.analyzeImage(base64data);
  res.json({
    analyzedAt: new Date().toDateString(),
    response
  })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
