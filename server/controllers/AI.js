import { generateRes, sendErrorLog } from '../utils/api.js';
import aiService from '../services/ai.js';

async function analyzeImages(req, res) {
  try {
    const { body } = req;
    const { imageUrl } = body;

    const analyze = await aiService.analyzeImages(imageUrl);

    res.json(generateRes({ data: analyze }));
  } catch (err) {
    sendErrorLog({
      url: 'GET api/ai/analyze',
      res,
      err,
    });
  }
}

export default {
  analyzeImages,
};
