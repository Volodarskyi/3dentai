import { NextFunction, Request, Response } from 'express';
import {sendResError} from "@/utils/responseUtils";

export class AppError extends Error {
    status: number;
    details?: any;

    constructor(message: string, status: number = 500, details?: any) {
        super(message);
        this.status = status;
        this.details = details;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const details = err.details || null;

    console.error(`Error: ${message}, StatusCode: ${statusCode}`);

    sendResError(res, message, statusCode, details);
};
