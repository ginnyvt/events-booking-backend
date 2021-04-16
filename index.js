const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const eventRoutes = require('./routes/events');
const participantRoutes = require('./routes/participants');
const subscriberRoutes = require('./routes/subscribers');
const userRoutes = require('./routes/users');

// Utils import
// const checkJwt = require('./utils/checkJwt');

app.use(cors());
app.use(bodyParser.json());
// app.use(checkJwt);

app.use('/events', eventRoutes);
app.use('/participants', participantRoutes);
app.use('/subscribers', subscriberRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
