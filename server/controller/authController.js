// const authController = {};

// // validate user
// authController.authUser = async (req, res, next) => {
//   console.log('inside authUser in controller');
//   const { email, password } = req.body;
//   // get user from db
//   const userCheck = await User.find({ email });
//   console.log('email : ', email, ' : ', userCheck);
//   // check if user is in db
//   if (userCheck.length <= 0) {
//     return next({ message: { err: 'user not found' } });
//   }
//   //compare password
//   const match = bcrypt.compare(
//     password,
//     userCheck[0].password,
//     function (err, result) {
//       if (result === true) {
//         //console.log('this is the log ', userCheck[0]);
//         res.locals.user = userCheck[0];
//         res.cookie('token', 'logged in');
//         return next();
//       } else {
//         return next({ message: { err: 'user not found or wrong password' } });
//       }
//     }
//   );
// };

// authController.validateCookie = (req, res, next) => {
//   if (req.cookies.token === 'logged in') {
//     return next();
//   }
//   res.status(401).send('Plese sign in.');
// };

// module.exports = authController;
