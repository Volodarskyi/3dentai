import mistralService from './mistral.js';

async function analyzeImages(imageUrl) {
  return mistralService.analyzeImage(imageUrl);
}

export default {
  analyzeImages,
};
