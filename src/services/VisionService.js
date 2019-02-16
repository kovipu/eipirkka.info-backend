const automl = require('@google-cloud/automl');
const fs = require('fs');

const { PROJECT_ID, REGION_NAME, MODEL_ID } = process.env;

function VisionService() {
  const predictionClient = new automl.PredictionServiceClient();
  const name = predictionClient.modelPath(PROJECT_ID, REGION_NAME, MODEL_ID);

  console.log('name:', name)

  function analyzeImage(data) {
    if (!data.path) {
      console.log('No file received');
      return { success: false };
    }

    const file = fs.readFileSync(data.path);

    const payload = {
      image: {
        imageBytes: file.toString('base64')
      }
    };

    predictionClient.predict({ name, payload })
      .then(res => console.log('Response: ', res))
      .catch(err => console.log('Error: ', err));
  }
  return {
    analyzeImage
  }
}

module.exports = VisionService;
