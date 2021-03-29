const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const createEvent_ctl = require('./controllers/events/createEvent');

app.use(cors());
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const sendSuccessResponse = (message, results, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
};
