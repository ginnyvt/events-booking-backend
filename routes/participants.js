const express = require('express');
const router = express.Router();

const httpResponse = require('../utils/http-response');
const check = require('../utils/check-jwt');

const registerParticipantCtl = require('../controllers/participants/registerParticipant');

router.post('/:eventId', check.checkJwt, async (req, res) => {
  try {
    const data = await registerParticipantCtl.invoke(req);
    res
      .status(200)
      .json(httpResponse.sendSuccessResponse('OK', data, res.statusCode));
  } catch (err) {
    console.log(err);
    // httpResponse.sendErrorResponse(res, err);
  }
});

module.exports = router;
