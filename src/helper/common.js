const response = (res, result, status, message, pagination) => {
  const resultPrint = {};
  resultPrint.status = "success";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.pagination = pagination || {};
  res.status(status).json(resultPrint);
};

const failed = (res, code, message) => {
  const resultPrint = {};
  resultPrint.status = "error";
  resultPrint.statusCode = code;
  resultPrint.message = message || null;
  res.status(code).json(resultPrint);
}

module.exports = { response, failed };
