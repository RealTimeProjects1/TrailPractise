const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import user router
const userRouter = require('../login&register/router/router');

const app = express();
app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// API routes
app.use('/api/users', userRouter);

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
