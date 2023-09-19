const mongoose = require('mongoose');
const { User } = require('./userModel');

const Schema = mongoose.Schema;

// optionSchema
const optionSchema = new Schema({
  text: { type: String, required: true },
  votesCount: { type: Number, default: 0 },
  selectedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true, // Ensures that a user can select the option only once
    },
  ],
});

// Option model based on the optionSchema
const Option = mongoose.model('Option', optionSchema);

//questionSchema
const questionSchema = new Schema({
  title: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  options: [optionSchema],
  mostSelectedOption: { type: Schema.Types.ObjectId, ref: 'Option' },
});

const Question = mongoose.model('survey', questionSchema);

module.exports = { Question, Option };
