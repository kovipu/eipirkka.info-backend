const express = require('express');
const multer = require('multer');
const cors = require('cors');

const VisionService = require('./services/VisionService');

const app = express();
const visionService = VisionService();
const upload = multer({ dest: '/tmp/' });

const corsWhitelist = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
]

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/predict', cors(corsOptions), upload.single('image'), (req, res) => {
  const base64data = req.file;
  visionService.analyzeImage(base64data)
    .then(response => res.send(response))
    .catch(err => res.status(500).send(err));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
