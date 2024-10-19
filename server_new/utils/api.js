export function generateRes(values = {}) {
  const { status = 200, data, error, message } = values;

  return {
    status,
    data,
    ...(message && { message }),
    ...(error && { error: error || 'unexpected error' }),
  };
}

export const sendErrorLog = ({ res, url = '', err = '', resData }) => {
  console.log(`SERVER ERROR`, err);

  res.json(
    generateRes({
      status: 400,
      message: url,
      err,
      ...(resData !== undefined && { data: resData }),
    }),
  );
};
