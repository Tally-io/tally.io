require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const startServer = require('./database/dbConnection.js');
const PORT = 3000;

const userController = require('./controller/userController.js');
const userRouter = require('./router/userRouter');
const surveyRouter = require('./router/surveyRouter');
app.use(express.json());
// if you ever have a form on your frontend, express.urlencoded
app.use(express.urlencoded({ extended: true })); // this will be helpful for stringifying a form req from an .html file

startServer();

// console.log('before userRouter');
app.use('/user', userRouter);

// respond to get request ot root wiht html for welcome screen
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.js'));
});

app.use('/user', userRouter);
app.use('/survey', surveyRouter);
// catch all route
app.get('*', (req, res) => {
  return res.status(404).send('Page Not Found!');
});

// global error handler
// 500 = internal error
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
