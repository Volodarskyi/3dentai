import mistralService from './mistral';

async function analyzeImages(imageUrl: string) {
  return mistralService.analyzeImage(imageUrl);
}

export default {
  analyzeImages,
};
