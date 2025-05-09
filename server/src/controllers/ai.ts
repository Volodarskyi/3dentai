import { Request, Response } from 'express';
import { generateRes, sendErrorLog } from '@/utils/api';
import aiService from '../services/ai';

async function analyzeImages(
  req: Request<{ imageUrl: string }>,
  res: Response,
) {
  try {
    const { body } = req;
    const { imageUrl } = body;

    if (!imageUrl) {
      throw new Error(`Params imageUrl is required.`);
    }
    const analyze = await aiService.analyzeImages(imageUrl);
    res.json(generateRes({ data: analyze }));
  } catch (error) {
    sendErrorLog({
      url: 'GET api/ai/analyze',
      error: error?.toString(),
      res,
    });
  }
}

export default {
  analyzeImages,
};
