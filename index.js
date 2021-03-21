const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({ eventId: 1, title: 'Badminton Event' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
