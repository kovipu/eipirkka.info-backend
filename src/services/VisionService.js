const automl = require('@google-cloud/automl');

function VisionService() {
  const autoMLClient = new automl.AutoMlClient();

  function analyzeImage(data) {
    console.log('Data in request is', data);
    return true;
  }
  return {
    analyzeImage
  }
}

module.exports = VisionService;