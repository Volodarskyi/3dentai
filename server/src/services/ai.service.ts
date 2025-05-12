import mistralService from './mistral.service';

async function analyzeImages(imageUrl: string) {
  return mistralService.analyzeImage(imageUrl);
}

export default {
  analyzeImages,
};
