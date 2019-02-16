const automl = require('@google-cloud/automl').v1beta1;
const fs = require('fs');

const { PROJECT_ID, REGION_NAME, MODEL_ID } = process.env;

function VisionService() {
  const predictionClient = new automl.PredictionServiceClient();
  const name = predictionClient.modelPath(PROJECT_ID, REGION_NAME, MODEL_ID);

  console.log('name:', name)

  function analyzeImage(data) {
    console.log('Data', data);
    if (!data.path) {
      console.log('No file received');
      return { success: false };
    }

    const file = fs.readFileSync(data.path);
    // TODO: remove file from disk

    const payload = {
      image: {
        imageBytes: file.toString('base64')
      }
    };

    return predictionClient.predict({ name, payload })
      .then(responses => {
        const {displayName, classification} = responses[0].payload[0];
        console.log(displayName, classification);
        return {
          displayName,
          classificationScore: classification.score
        };
      }).catch(err => {
        console.error('Error', err);
      })
  }
  return {
    analyzeImage
  }
}

module.exports = VisionService;
