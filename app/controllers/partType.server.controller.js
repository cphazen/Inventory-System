'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PartType = mongoose.model('PartType'),
	_ = require('lodash');

/**
 * Create a PartType
 */
exports.create = function(req, res) {
	var PartType = new PartType(req.body);

	PartType.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(PartType);
		}
	});
};

/**
 * Show the current PartType
 */
exports.read = function(req, res) {
	res.json(req.PartType);
};

/**
 * Update a PartType
 */
exports.update = function(req, res) {
	var PartType = req.PartType;

	PartType = _.extend(PartType, req.body);

	PartType.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(PartType);
		}
	});
};

/**
 * Delete an PartType
 */
exports.delete = function(req, res) {
	var PartType = req.PartType;

	PartType.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(PartType);
		}
	});
};

/**
 * List of PartTypes
 */
exports.list = function(req, res) {
	PartType.find().sort('-created')/*.populate('user', 'displayName')*/.exec(function(err, PartTypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(PartTypes);
		}
	});
};

/**
 * PartType middleware
 */
exports.PartTypeByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'PartType is invalid'
		});
	}

	PartType.findById(id)/*.populate('user', 'displayName')*/.exec(function(err, PartType) {
		if (err) return next(err);
		if (!PartType) {
			return res.status(404).send({
  				message: 'PartType not found'
  			});
		}
		req.PartType = PartType;
		next();
	});
};

/**
 * PartType authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	/*if (req.PartType.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}*/
	next();
};
