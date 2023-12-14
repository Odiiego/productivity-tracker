const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ActivityRouter = require('./routes/activity.route');
const AuthRouter = require('./routes/auth.route');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todoapiDB';

app.use(cors());
app.use(express.json());
app.use('/api/auth', AuthRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', ActivityRouter);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
