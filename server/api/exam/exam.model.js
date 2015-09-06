'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExamSchema = new Schema({
  id: String,
  answer: Number
});

module.exports = mongoose.model('Exam', ExamSchema);