import {NextFunction, Request, Response} from 'express';
import aiService from '../services/ai.service';
import {sendResSuccess} from "@/utils/responseUtils";
import {AppError} from "@/utils/errorUtils";

async function analyzeImages(
  req: Request<{ imageUrl: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const { imageUrl } = body;

    if (!imageUrl) {
      throw new AppError('Params imageUrl is required.', 404);
    }
    const analyze = await aiService.analyzeImages(imageUrl);
    sendResSuccess(res, 'Image has been analyzed', { analyze });
  } catch (e) {
    console.error('Error in analyzeImages!',e)
    next(e);
  }
}

export default {
  analyzeImages,
};
