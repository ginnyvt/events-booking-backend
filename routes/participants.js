const express = require('express');
const router = express.Router();

const httpResponse = require('../utils/http-response');
const check = require('../utils/check-jwt');

const registerParticipantCtl = require('../controllers/participants/registerParticipant');
const pulloutParticipantCtl = require('../controllers/participants/pulloutParticipant');
const countParticipantsCtl = require('../controllers/participants/countParticipants');
const listParticipantsCtl = require('../controllers/participants/listParticipants');

router.post('/:eventId', check.checkJwt, async (req, res) => {
  try {
    const data = await registerParticipantCtl.invoke(req);
    res
      .status(200)
      .json(
        httpResponse.sendSuccessResponse(
          'Register successfully!',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
    httpResponse.sendErrorResponse(res, err);
  }
});

router.patch('/:eventId', check.checkJwt, async (req, res) => {
  try {
    const data = await pulloutParticipantCtl.invoke(req);
    res
      .status(200)
      .json(
        httpResponse.sendSuccessResponse(
          'Cancel successfully!',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
    httpResponse.sendErrorResponse(res, err);
  }
});

router.get('/count/:eventId', async (req, res) => {
  try {
    const data = await countParticipantsCtl.invoke(req);
    res
      .status(200)
      .json(httpResponse.sendSuccessResponse('OK', data, res.statusCode));
  } catch (err) {
    console.log(err);
    httpResponse.sendErrorResponse(res, err);
  }
});

router.get('/list/:eventId', async (req, res) => {
  try {
    const data = await listParticipantsCtl.invoke(req);
    res
      .status(200)
      .json(httpResponse.sendSuccessResponse('OK', data, res.statusCode));
  } catch (err) {
    console.log(err);
    httpResponse.sendErrorResponse(res, err);
  }
});

module.exports = router;
