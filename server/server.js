require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const startServer = require('./database/dbConnection.js');
const PORT = 3000;

// require router
const userRouter = require('./router/userRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

startServer();

// statically serve everything in the build folder on the route '/build'
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

console.log('before userRouter');
app.use('/user', userRouter);

// catch all route
app.get('*', (req, res) => {
  return res.status(404).send('Page Not Found!');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
