'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SheetSchema = new Schema({
	question: String,
	choices: [String],
	answer: String,
	updated: {
		type: Date,
		default: Date.now
	},
	active: Boolean
});

module.exports = mongoose.model('Sheet', SheetSchema);