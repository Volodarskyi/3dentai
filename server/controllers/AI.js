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

async function testApiAi(req, res) {
  try {
    console.log('Server API: GET api/AI/analyze', req);

    res.json(generateRes({ data: 'pong-ai' }));
  } catch (err) {
    sendErrorLog({
      res,
      url: 'GET api/AI/test',
      err,
    });
  }
}

async function testApiAiPost(req, res) {
  try {
    console.log('Server API: POST api/AI/analyze', req.body);

    res.json(generateRes({ data: 'pong-ai' }));
  } catch (err) {
    sendErrorLog({
      res,
      url: 'POST api/AI/test',
      err,
    });
  }
}

export default {
  getImages,
  analyzeImages,
  testApiAi,
  testApiAiPost,
};
