const { restart } = require('nodemon');
const User = require('../model/userModel.js');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const userController = {};

// create user
// first name, email, password
userController.registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, email, password } = req.body;

  //if (User.find({ username })) throw new Error("User already exists");
  const userCheck = await User.find({ email });
  //console.log('username : ', username, ' : ', userCheck);
  if (userCheck.length > 0) throw new Error('User already exists');
  // if we find the user we need to throw an error
  res.locals.registeredUser = await User.create({
    firstName: firstName,
    email: email,
    password: password,
  });

  return next();
});

// validate user
userController.authUser = async (req, res, next) => {
  const { firstName, email, password } = req.body;
  // get user from db
  const userCheck = await User.find({ email });
  console.log('email : ', email, ' : ', userCheck);
  // check if user is in db
  if (userCheck.length <= 0) {
    return next({ message: { err: 'user not found' } });
  }
  //compare password
  const match = bcrypt.compare(
    password,
    userCheck[0].password,
    function (err, result) {
      if (result === true) {
        //console.log('this is the log ', userCheck[0]);
        res.locals.user = userCheck[0];
        return next();
      } else {
        return next({ message: { err: 'user not found or wrong password' } });
      }
    }
  );
};

// Delete a user
// email and password must be passed in request body
userController.deleteUser = async (req, res, next) => {
  const { email, password } = req.body;
  //console.log('entering deletion middleware ');

  try {
    // find the user by email and delete
    await User.deleteOne({ email }).then(
      (user) => (res.locals.deletedUser = user)
    );
  } catch (err) {
    return next({
      status: 401,
      log: 'error in registerUser middleware',
      error: err,
    });
  }
  return next();
};

// find a user
// mostly for  testing deletion
// username must be passed in request body
module.exports = userController;
