const express = require('express');
const router = express.Router();

const createUserCtl = require('../controllers/users/createUser');

const httpResponse = require('../utils/http-response');

router.get('/', (req, res) => {
	res.status(200).json({ id: 1, username: 'quynh', email: 'quynh@gmail.com' });
});

router.post('/', async (req, res) => {
	try {
		const data = await createUserCtl.invoke(req);
		res
			.status(201)
			.json(
				httpResponse.sendSuccessResponse(
					'User created successfully',
					data,
					res.statusCode
				)
			);
	} catch (err) {
		httpResponse.sendErrorResponse(res, err);
	}
});

module.exports = router;
