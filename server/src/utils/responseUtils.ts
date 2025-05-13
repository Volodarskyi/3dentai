// Response utils
import {Response} from 'express';
import {EResponseResult} from "@/types/enums/ResponseEnums";

export const sendResponse = (
    res: Response,
    result: EResponseResult,
    message: string,
    data: any = null,
    error: { code?: number; details?: any } | null = null
): void => {
    const statusCode = result === EResponseResult.SUCCESS ? 200 : error?.code || 400;

    res.status(statusCode).json({
        result,
        message,
        data,
        error,
    });
};

// Success Response Helper
export const sendResSuccess = (
    res: Response,
    message: string,
    data: any = null
): void => {
    sendResponse(res, EResponseResult.SUCCESS, message, data);
};

// Error Response Helper
export const sendResError = (
    res: Response,
    message: string,
    errorCode: number = 400,
    details: any = null
): void => {
    sendResponse(res, EResponseResult.ERROR, message, null, { code: errorCode, details });
};
