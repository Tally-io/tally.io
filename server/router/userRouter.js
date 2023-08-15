// requirements
const express = require('express');
const app = express();
const path = require('path');

const userController = require('../controller/userController.js');

const userRouter = express.Router();

// add user to db
userRouter.post('/', userController.registerUser, (req, res) => {
  // after middleware, need to send data back to client
  // 201 = created
  return res.status(201).json(res.locals.registeredUser);
});

// export
module.exports = userRouter;
