import { Response } from 'express';

interface IGenerateRes {
  data?: any;
  status?: number;
  message?: string;
  error?: string;
}

export function generateRes(values: IGenerateRes) {
  const { status = 200, data, error, message = 'unexpected error' } = values;

  return {
    status,
    data,
    ...(message && { message }),
    ...(error && { error }),
  };
}

interface ISendErrorLog {
  res: Response;
  error?: string;
  url?: string;
  resData?: any;
}

export const sendErrorLog = ({
  res,
  url = '',
  error = '',
  resData,
}: ISendErrorLog) => {
  console.log(`SERVER ERROR`, error);

  res.json(
    generateRes({
      status: 400,
      message: url,
      error,
      ...(resData !== undefined && { data: resData }),
    }),
  );
};
