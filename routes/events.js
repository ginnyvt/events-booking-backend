const express = require('express');
const router = express.Router();

const createEventCtl = require('../controllers/events/createEvent');

const httpResponse = require('../utils/http-response');

router.get('/', (req, res) => {
  res.status(200).json({ id: 1, title: 'Badminton event' });
});

router.post('/', async (req, res) => {
  try {
    const data = await createEventCtl.invoke(req);
    res
      .status(201)
      .json(httpResponse.sendSuccessResponse('OK', data, res.statusCode));
  } catch (err) {
    console.log(err);
    // httpResponse.sendErrorResponse(res, err);
  }
});

module.exports = router;
