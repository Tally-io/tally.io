require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const startServer = require('./database/dbConnection.js');
const PORT = 3000;

const userRouter = require('./router/userRouter');
const authController = require('./controller/authController');
const cookieParser = require('cookie-parser');

app.use(express.json());
// if you ever have a form on your frontend, express.urlencoded
// this will be helpful for stringifying a form req from an .html file
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
startServer();

// console.log('before userRouter');
app.use('/user', userRouter);

app.get('/landingpage', (req, res) => {
  return res
    .status(200)
    .sendFile(
      path.resolve(__dirname, '../client/components/Admin/Landing.jsx')
    );
});

// serve sign in page
app.post('/signin', authController.authUser, (req, res) => {
  console.log('signed in, redirecting to home');
  res.redirect('/home');
});

// serve home html page
// res.type is the response header sent with HTTP request
app.get('/home', authController.validateCookie, (req, res) => {
  return res
    .type('html')
    .status(200)
    .sendFile(path.join(__dirname, '../client/components/Admin/Home.jsx'));
});

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
