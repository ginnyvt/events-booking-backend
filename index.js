const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const tokenRoutes = require('./routes/tokens');

app.use(cors());
app.use(bodyParser.json());

app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/tokens', tokenRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
