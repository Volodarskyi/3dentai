import { Request, Response, NextFunction } from "express";
import {Question} from "@/models/Question";
import {sendResSuccess} from "@/utils/responseUtils";


export interface ICreateQuestionReqBody {
    type: "checkbox" | "radio";
    question: string;
    answers: {
        label: string;
        value?: boolean; // необязательный, т.к. можно по умолчанию ставить false
    }[];
    active?: boolean; // по умолчанию true, если не передан
}

// 'api/questions/create'
const createQuestion = async (
    req: Request<object, object, ICreateQuestionReqBody>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        console.log('[API] | [api/questions/create] | [req.body] :', req.body);
        const newQuestion = await Question.create(req.body);
        sendResSuccess(res, 'New question has been added', {newQuestion});
    } catch (error) {
        console.error("Create question error:", error);
        next(error);
    }
};

// 'api/questions/active'
const getQuestionsActive = async (req: Request, res: Response,next: NextFunction) => {
    try {
        console.log('[API] | [api/questions/active] ');
        const onlyActive = req.query.active === "true";
        const filter = onlyActive ? { active: true } : {};
        const questions = await Question.find(filter).sort({ createdAt: -1 });
        sendResSuccess(res, 'List of active questions', {questions});
    } catch (error) {
        console.error("ERROR! getQuestionsActive |", error);
        next(error);
    }
};


export default {
    createQuestion,
    getQuestionsActive
}