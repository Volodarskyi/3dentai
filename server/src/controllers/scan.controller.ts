import {NextFunction, Request, Response} from 'express';
import {sendResSuccess} from "@/utils/responseUtils";

interface IScanSaveReqBody {

}
// 'api/scan/save'
const saveScan = async (
    req: Request<object, object, IScanSaveReqBody>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        console.log('Scan Saved')
        sendResSuccess(res,'Scan Saved', {scanId:'test-id-scan-1'})
    } catch (e) {
        console.error('ERROR (Auth.route-register):', e);
        next(e);
    }
};

export default {
    saveScan,
}