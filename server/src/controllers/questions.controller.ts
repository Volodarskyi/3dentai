import {NextFunction, Request, Response} from 'express';
import {sendResSuccess} from "@/utils/responseUtils";

interface IAddQuestionReqBody {

}
// 'api/questions/add'
const addQuestion = async (
    req: Request<object, object, IAddQuestionReqBody>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        console.log('Add Question')
        sendResSuccess(res,'Question has been added', {questionId:'test-id-q-1'})
    } catch (e) {
        console.error('ERROR in saveScan:', e);
        next(e);
    }
};

export default {
    addQuestion,
}