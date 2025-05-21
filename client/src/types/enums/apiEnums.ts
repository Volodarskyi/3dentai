// shared/interfaces/ApiResponse.ts
export enum EResponseResult {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

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
