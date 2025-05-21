import {EResponseResult} from "@/types/enums/apiEnums";

export interface IApiError {
    code?: number;
    details?: any;
}

export interface IApiResponse<T = any> {
    result: EResponseResult;
    message: string;
    data: T | null;
    error?: IApiError | null;
}