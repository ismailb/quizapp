'use strict';

var _ = require('lodash');
var Sheet = require('./sheet.model');

// Get list of sheets
exports.index = function(req, res) {
  Sheet.find(function (err, sheets) {
    if(err) { return handleError(res, err); }
    return res.json(200, sheets);
  });
};

// Get a single sheet
exports.show = function(req, res) {
  Sheet.findById(req.params.id, function (err, sheet) {
    if(err) { return handleError(res, err); }
    if(!sheet) { return res.send(404); }
    return res.json(sheet);
  });
};

// Creates a new sheet in the DB.
exports.create = function(req, res) {
  Sheet.create(req.body, function(err, sheet) {
    if(err) { return handleError(res, err); }
    return res.json(201, sheet);
  });
};

// Updates an existing sheet in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sheet.findById(req.params.id, function (err, sheet) {
    if (err) { return handleError(res, err); }
    if(!sheet) { return res.send(404); }
    var updated = _.merge(sheet, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, sheet);
    });
  });
};

// Deletes a sheet from the DB.
exports.destroy = function(req, res) {
  Sheet.findById(req.params.id, function (err, sheet) {
    if(err) { return handleError(res, err); }
    if(!sheet) { return res.send(404); }
    sheet.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}