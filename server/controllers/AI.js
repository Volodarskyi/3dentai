import { generateRes, sendErrorLog } from '../utils/api.js';
import AIService from '../services/AI.js';

async function getImages(req, res) {
  try {
    const images = await AIService.getImages();

    res.json(generateRes({ data: images }));
  } catch (err) {
    sendErrorLog({
      res,
      url: 'GET api/AI/',
      err,
    });
  }
}

async function analyzeImages(req, res) {
  try {
    const images = await AIService.analyzeImages();

    res.json(generateRes({ data: images }));
  } catch (err) {
    sendErrorLog({
      res,
      url: 'GET api/AI/analyze',
      err,
    });
  }
}

export default {
  getImages,
  analyzeImages,
};
