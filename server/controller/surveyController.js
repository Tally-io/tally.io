const shortid = require('shortid'); // Import the shortid library
const surveyModel = require('../model/surveyModel');
const asyncHandler = require('express-async-handler');
const { Question, Option } = surveyModel;

const surveyController = {};

surveyController.createQuestion = async (req, res, next) => {
  console.log('insiede create question');
  try {
    const { title, options, createdBy } = req.body;

    // create the options
    const optionObjects = options.map(
      (optionText) => new Option({ option: optionText })
    );

    // console.log(optionObjects);
    //save options
    const savedOptions = await Option.insertMany(optionObjects);
    console.log('SAVED OPTIONS', savedOptions);
    // create a unique URL using shortid
    uniqueUrl = shortid.generate();

    //create question
    const newQuestion = new Question({
      title,
      invitationUrl: uniqueUrl,
      createdBy,
      options: savedOptions.map((option) => option._id),
    });

    await newQuestion.save();
    res.local.createdDoc = newQuestion;
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught unknown middleware error: ERROR : ${err}`,
      status: err.status || 500,
      message: 'Error creating question',
    });
  }
};

surveyController.serveQuestions = async (req, res, next) => {
  try {
    const questionId = req.params.questionId;
    const uniqueUrl = req.params.uniqueUrl;

    // Fetch the question using questionId and validate the uniqueUrl
    const question = await Question.findOne({
      _id: questionId,
      invitationUrl: uniqueUrl,
    }).populate('options');

    if (!question) {
      return res
        .status(404)
        .json({ message: 'Question not found or URL invalid.' });
    }

    // Render your survey page with the retrieved question and options
    res.local.question = question;
    return next();
  } catch (err) {
    return next({
      log: `Error fetching survey: ${err}`,
      status: 500,
      message: 'An error occurred while fetching the survey.',
    });
  }
};

module.exports = surveyController;
