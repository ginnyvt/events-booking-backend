const sendSuccessResponse = (message, results, statusCode) => {
	return {
		message,
		error: false,
		code: statusCode,
		results,
	};
};

const sendErrorResponse = (res, error) => {
	res.setHeader('Content-Type', 'application/json');
	res.status(error.statusCode);
	res.end(error.message);
};

module.exports = { sendSuccessResponse, sendErrorResponse };
