'use strict';

/**
 * Module dependencies.
 */
var mongoose        = require('mongoose'),
	errorHandler    = require('./errors.server.controller'),
    Parts	        = mongoose.model('Parts'),
	_               = require('lodash');

/**
 * Create a Part
 */
exports.create = function(req, res) {
	var parts = new Parts(req.body);

	parts.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(parts);
		}
	});
};

/**
 * Show the current Part
 */
exports.read = function(req, res) {
	res.json(req.parts);
};

/**
 * Update a Part
 */
exports.update = function(req, res) {
	var parts = req.parts;

	parts = _.extend(parts, req.body);

	parts.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(parts);
		}
	});
};

/**
 * Delete a Part
 */
exports.delete = function(req, res) {
	var parts = req.parts;

	parts.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(parts);
		}
	});
};

/**
 * List of Parts
 */
exports.list = function(req, res) {
	Parts.find().exec(function(err, parts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(parts);
		}
	});
};

/**
 * Parts middleware
 */
exports.partByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Part is invalid'
		});
	}

	Parts.findById(id).exec(function(err, parts) {
		if (err) return next(err);
		if (!parts) {
			return res.status(404).send({
  				message: 'Part not found'
  			});
		}
		req.parts = parts;
		next();
	});
};
