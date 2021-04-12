const express = require('express');
const router = express.Router();

const addSubscriberCtl = require('../controllers/subscribers/addSubscriber');
// const updateSubscriberCtl = require('../controllers/subscribers/updateSubscriber');
// const deleteSubscriberCtl = require('../controllers/subscribers/deleteSubscriber');

const httpResponse = require('../utils/http-response');

router.post('/', async (req, res) => {
  try {
    const data = await addSubscriberCtl.invoke(req);
    res
      .status(201)
      .json(
        httpResponse.sendSuccessResponse(
          'Subscriber successfully added.',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    // console.log(err);
    httpResponse.sendErrorResponse(res, err);
  }
});

module.exports = router;
