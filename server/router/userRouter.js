// requirements
const express = require('express');
const app = express();
const path = require('path');

const userController = require('../controller/userController.js');

const userRouter = express.Router();

console.log('inside userRouter');

// to create user into database
// takes in body
// firstName, email, password
userRouter.post('/create', userController.registerUser, (req, res) => {
  console.log('post req');
  // after middleware, need to send data back to client
  // 201 = created
  return res.status(201).json(res.locals.registeredUser);
});

// delete user from database
userRouter.delete('/delete', userController.deleteUser, (req, res) => {
  cl;
  return res.status(202).json(res.locals.deletedUser);
});

// to authenticate user based on input username and password
app.post('/login', userController.authUser, (req, res) => {
  return res.status(202).json(res.locals.user);
});

// export
module.exports = userRouter;
