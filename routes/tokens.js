const express = require('express');
const router = express.Router();

const httpResponse = require('../utils/http-response');
const createTokenCtl = require('../controllers/tokens/createToken');

router.post('/', async (req, res) => {
	try {
		const data = await createTokenCtl.invoke(req);
		res
			.status(201)
			.json(
				httpResponse.sendSuccessResponse(
					'User login successfully',
					data,
					res.statusCode
				)
			);
	} catch (err) {
		httpResponse.sendErrorResponse(res, err);
	}
});

module.exports = router;
