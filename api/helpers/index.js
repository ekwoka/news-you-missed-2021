export const formattedReturn = function (statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};
