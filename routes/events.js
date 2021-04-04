const express = require('express');
const router = express.Router();

const createEventCtl = require('../controllers/events/createEvent');
const getEventCtl = require('../controllers/events/getEvent');
const updateEventCtl = require('../controllers/events/updateEvent');
const deleteEventCtl = require('../controllers/events/deleteEvent');

const httpResponse = require('../utils/http-response');
const check = require('../utils/check-jwt');

router.get('/', (req, res) => {
  res.status(200).json({ id: 1, title: 'Badminton event' });
});

router.post('/', check.checkJwt, async (req, res) => {
  try {
    const data = await createEventCtl.invoke(req);
    res
      .status(201)
      .json(
        httpResponse.sendSuccessResponse(
          'Event successfully created.',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
    // httpResponse.sendErrorResponse(res, err);
  }
});

router.get('/:eventId', async (req, res) => {
  try {
    const data = await getEventCtl.invoke(req);
    res
      .status(200)
      .json(
        httpResponse.sendSuccessResponse(
          'Event successfully retrieved.',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
    // httpResponse.sendErrorResponse(res, err);
  }
});

router.patch('/:eventId', check.checkJwt, async (req, res) => {
  try {
    const data = await updateEventCtl.invoke(req);
    res
      .status(200)
      .json(
        httpResponse.sendSuccessResponse(
          'Event successfully updated.',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
    // httpResponse.sendErrorResponse(res, err);
  }
});

router.delete('/:eventId', check.checkJwt, async (req, res) => {
  try {
    const data = await deleteEventCtl.invoke(req);
    res
      .status(200)
      .json(
        httpResponse.sendSuccessResponse(
          'Event successfully deleted.',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
    // httpResponse.sendErrorResponse(res, err);
  }
});

module.exports = router;
