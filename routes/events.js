const express = require('express');
const router = express.Router();

const createEvent_ctl = require('../controllers/events/createEvent');

router.get('/', (req, res) => {
  res.status(200).json({ id: 1, title: 'Badminton event' });
});

router.post('/', async (req, res) => {
  try {
    const data = await createEvent_ctl.invoke(req);
    res
      .status(201)
      .json(
        sendSuccessResponse(
          'OK',
          { eventId: 1, title: 'Badminton Event' },
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

const sendSuccessResponse = (message, results, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
};
