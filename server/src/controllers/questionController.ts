import { Request, Response } from 'express';
import { sendErrorLog } from '@/utils/api';
import { Question } from '@/models/Question';

const getAllQuestionsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const questions = await Question.find();

    res.status(200).json({
      result: 'SUCCESS',
      data: questions,
      message: 'Questions retrieved successfully',
      details: `Retrieved ${questions.length} questions`,
    });
  } catch (e) {
    console.error('ERROR (Question.route-getAllQuestions):', e);
    sendErrorLog({
      res,
      url: 'GET api/questions',
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: get all questions',
    });
  }
};

const getActiveQuestionsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const activeQuestions = await Question.find({ active: true });

    res.status(200).json({
      result: 'SUCCESS',
      data: activeQuestions,
      message: 'Active questions retrieved successfully',
      details: `Retrieved ${activeQuestions.length} active questions`,
    });
  } catch (e) {
    console.error('ERROR (Question.route-getActiveQuestions):', e);
    sendErrorLog({
      res,
      url: 'GET api/questions/active',
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: get active questions',
    });
  }
};

const addQuestionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const questionData = req.body;

    const newQuestion = new Question(questionData);
    const savedQuestion = await newQuestion.save();

    res.status(201).json({
      result: 'SUCCESS',
      data: savedQuestion,
      message: 'Question added successfully',
      details: `Added question: ${savedQuestion.value}`,
    });
  } catch (e) {
    console.error('ERROR (Question.route-addQuestion):', e);
    sendErrorLog({
      res,
      url: 'POST api/questions',
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: add question',
    });
  }
};

export default {
  getAllQuestionsController,
  getActiveQuestionsController,
  addQuestionController,
};
