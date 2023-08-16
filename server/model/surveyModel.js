const mongoose = require('mongoose');
const { User } = require('./userModel');

const Schema = mongoose.Schema;

// optionSchema
const optionSchema = new Schema({
  option: { type: String, required: true },
  votesCount: { type: Number, default: 0 },
});

// Option model based on the optionSchema
const Option = mongoose.model('Option', optionSchema);

//questionSchema
const questionSchema = new Schema({
  title: { type: String, required: true },
  invitationUrl: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  options: [optionSchema],
  mostSelectedOption: { type: Schema.Types.ObjectId, ref: 'Option' },
});

//method to calculate and update mostSelectedOption
questionSchema.methods.calculateMostSelectedOption = async function () {
  const mostSelected = this.options.reduce(
    (prev, current) => (prev.votesCount > current.votesCount ? prev : current),
    this.options[0]
  );
  this.mostSelectedOption = mostSelected._id;
  await this.save();
};

const Question = mongoose.model('tallies', questionSchema);

module.exports = { Question, Option };
