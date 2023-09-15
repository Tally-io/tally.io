// requirements
const express = require("express");
const app = express();
const path = require("path");

const userController = require("../controller/userController.js");
const surveyController = require("../controller/surveyController.js");

const router = express.Router();

console.log("inside surveyRouter");
// add user to db
router.post("/createTally", surveyController.createQuestion, (req, res) => {
  // after middleware, need to send data back to client
  // 201 = created
  return res.status(201).json(res.locals.sendDoc);
});

console.log("before serving the questions");

router.get("/:questionId", surveyController.serveQuestions, (req, res) => {
  return res.status(201).json(res.locals.question);
});

// Handle user's option selection using PATCH method
router.patch(
  "/:questionId/sendOptions",
  surveyController.selectOption,
  (req, res) => {
    return res.status(201).json(res.locals.options);
  }
);

router.get("/getWinner/:questionId", surveyController.getWinner, (req, res) => {
  return res
    .status(201)
    .json({ question: res.locals.question, winner: res.locals.winner });
});

// export
module.exports = router;
