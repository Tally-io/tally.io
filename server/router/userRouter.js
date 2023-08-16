// requirements
const express = require('express');
const app = express();
const path = require('path');

const userController = require('../controller/userController.js');
const authController = require('../controller/authController.js');

const userRouter = express.Router();

console.log('inside userRouter');

// to create user into database
// takes in body: firstName, email, password
userRouter.post('/create', userController.registerUser, (req, res) => {
  console.log('created user');
  // after middleware, need to send data back to client
  // 201 = created
  return res.status(201).json(res.locals.registeredUser);
});

// delete user from database
userRouter.delete('/delete', userController.deleteUser, (req, res) => {
  console.log('deleted user');
  return res.status(202).json(res.locals.deletedUser);
});

// export
module.exports = userRouter;
