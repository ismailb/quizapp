'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var random = require('mongoose-random');	

var SheetSchema = new Schema({
	question: String,
	choices: [String],
	answer: Number,
	updated: {
		type: Date,
		default: Date.now
	},
	active: Boolean
});

SheetSchema.virtual('id').get(function() {
  return this._id.toString();
});


SheetSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Sheet', SheetSchema);