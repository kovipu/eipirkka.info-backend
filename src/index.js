const express = require('express');
const automl = require('@google-cloud/automl');

const app = express();
const autoMLClient = new automl.AutoMlClient();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
