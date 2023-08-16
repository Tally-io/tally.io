// requirements
const express = require('express');
const app = express();
const path = require('path');

const userController = require('../controller/userController.js');
const surveyController = require('../controller/surveyController.js');

const router = express.Router();

console.log('inside surveyRouter');
// add user to db
router.post('/createPoll', surveyController.createQuestion, (req, res) => {
  // after middleware, need to send data back to client
  // 201 = created
  return res.status(201).json(res.locals.createdDoc);
});

router.post(
  '/survey/:questionId/:uniqueUrl',
  surveyController.serveQuestions,
  (req, res) => {
    // after middleware, need to send data back to client
    // 201 = created
    return res.status(201).json(res.locals.question);
  }
);

// export
module.exports = router;
