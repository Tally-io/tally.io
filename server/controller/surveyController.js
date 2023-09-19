const surveyModel = require("../model/surveyModel");
const asyncHandler = require("express-async-handler");
const { parse } = require("dotenv");
const { Question, Option } = surveyModel;

const surveyController = {};

surveyController.createQuestion = async (req, res, next) => {
  try {
    const { title, options, createdBy } = req.body;

    //create question
    const newQuestion = new Question({
      title,
      createdBy,
      options: options.map((option) => {
        return new Option({ text: option });
      }),
    });
    console.log(newQuestion);
    await newQuestion.save();

    res.locals.sendDoc = {
      invitationUrl: `http://localhost:3000/survey/${newQuestion._id}`,
      id: newQuestion._id,
    };
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught unknown middleware error: ERROR : ${err}`,
      status: err.status || 500,
      message: "Error creating question",
    });
  }
};

surveyController.serveQuestions = async (req, res, next) => {
  try {
    const questionId = req.params.questionId;
    // console.log(questionId);
    const question = await Question.findById(questionId);

    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found or URL invalid." });
    }

    // send back the entire question using res.locals
    res.locals.question = question;
    return next();
  } catch (err) {
    return next({
      log: `Error fetching survey: ${err}`,
      status: 500,
      message: "An error occurred while fetching the survey.",
    });
  }
};

surveyController.selectOption = async (req, res, next) => {
  try {
    const { userId, questionId, optionId } = req.body;

    // Find the question
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Find the selected option within the question
    const selectedOption = question.options.find(
      (option) => option._id.toString() === optionId
    );

    if (!selectedOption) {
      return res.status(404).json({ message: "Option not found" });
    }

    // Check if the user has already selected this option
    if (selectedOption.selectedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Option already selected by this user" });
    }

    // Add the user ID to the selectedBy array
    selectedOption.selectedBy.push(userId);

    // Update votesCount for the selected option
    selectedOption.votesCount++;

    // Find the most selected option based on votesCount
    const mostSelected = question.options.reduce((prev, current) =>
      prev.votesCount > current.votesCount ? prev : current
    );

    // Update the mostSelectedOption field in the question
    question.mostSelectedOption = mostSelected._id;

    // Save the updated question
    await question.save();

    // Get the selected option text and most selected option text
    const selectedOptionText = selectedOption.text;
    const mostSelectedOptionText = mostSelected.text;
    // console.log('After saving:', question);

    res.locals.options = {
      selectedOptionText,
      mostSelectedOptionText,
    };
    return next();
  } catch (err) {
    return next({
      log: `Error fetching survey: ${err}`,
      status: 500,
      message: "An error occurred while fetching the survey.",
    });
  }
};

surveyController.getWinner = async (req, res, next) => {
  try {
    const questionId = req.params.questionId;

    const question = await Question.findById(questionId);

    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found or URL invalid." });
    }

    // Find the most selected option based on votesCount
    const mostSelected = question.options.reduce((prev, current) =>
      prev.votesCount > current.votesCount ? prev : current
    );

    // send back the  question and winner using res.locals
    res.locals.question = question.title;
    res.locals.winner = mostSelected.text;

    return next();
  } catch (err) {
    return next({
      log: `Error fetching survey: ${err}`,
      status: 500,
      message: "An error occurred while fetching the survey.",
    });
  }
};

module.exports = surveyController;
