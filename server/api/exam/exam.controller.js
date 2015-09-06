'use strict';

var _ = require('lodash');
var Exam = require('./exam.model');
var Sheet = require('../sheet/sheet.model');

// Get list of exams
exports.index = function(req, res) {
  var filter = {};
  var fields = {
    answer: 0,
    updated: 0,
    r: 0,
    __v: 0,
    active: 0
  };
  var options = {
    limit: 10
  };

  Sheet.findRandom(filter, fields, options, function(err, sheets) {
    if (err) {
      return handleError(res, err);
    }
    if (!sheets) {
      return res.status(404).send('Not Found');
    }
    return res.json(sheets);
  });
};

// Get a single exam
exports.show = function(req, res) {
  /*Sheet.findRandom().limit(10).exec(function (err, sheets) {
    if(err) { return handleError(res, err); }
    if(!sheets) { return res.status(404).send('Not Found'); }
    return res.json(sheets);
  });*/
  Exam.findById(req.params.id, function(err, exam) {
    if (err) {
      return handleError(res, err);
    }
    if (!exam) {
      return res.status(404).send('Not Found');
    }
    return res.json(exam);
  });
};

// Creates a new exam in the DB.
exports.create = function(req, res) {
  Sheet.count({
    $or: req.body
  }).exec(function(err, score) {
    console.log(req.body);
    console.log(score);
    if (err) {
      return handleError(res, err);
    }
    if (!score) {
      return res.status(500).send('Error Occurred');
    }
    return res.json({
      score: score
    });
  });
};

// Updates an existing exam in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Exam.findById(req.params.id, function(err, exam) {
    if (err) {
      return handleError(res, err);
    }
    if (!exam) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(exam, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(exam);
    });
  });
};

// Deletes a exam from the DB.
exports.destroy = function(req, res) {
  Exam.findById(req.params.id, function(err, exam) {
    if (err) {
      return handleError(res, err);
    }
    if (!exam) {
      return res.status(404).send('Not Found');
    }
    exam.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}