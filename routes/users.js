const express = require('express');
const router = express.Router();

const httpResponse = require('../utils/http-response');
const check = require('../utils/check-jwt');

const getUserCtl = require('../controllers/users/getUser.js');
const updateUserCtl = require('../controllers/users/updateUser.js');

router.get('/:userId', async (req, res) => {
  try {
    const data = await getUserCtl.invoke(req);
    res
      .status(200)
      .json(
        httpResponse.sendSuccessResponse(
          'User successfully retrieved.',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
    httpResponse.sendErrorResponse(res, err);
  }
});

router.patch('/', check.checkJwt, async (req, res) => {
  try {
    const data = await updateUserCtl.invoke(req);
    res
      .status(200)
      .json(
        httpResponse.sendSuccessResponse(
          'User successfully updated.',
          data,
          res.statusCode
        )
      );
  } catch (err) {
    console.log(err);
    httpResponse.sendErrorResponse(res, err);
  }
});

module.exports = router;
