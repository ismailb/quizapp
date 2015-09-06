'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExamSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Exam', ExamSchema);