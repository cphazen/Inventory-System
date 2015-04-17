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
	var part = new Parts(req.body);

	part.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(part);
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
	var part = req.parts;

	part = _.extend(part, req.body);

	part.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(part);
		}
	});
};

/**
 * Delete a Part
 */
exports.delete = function(req, res) {
	var part = req.parts;

	part.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(part);
		}
	});
};


/**
 * List of PartTypes
 */
exports.list = function(req, res) {
    /**
     * This needs to be fixed
     */
	Parts.find()/*.sort('-created').populate('user', 'displayName')*/.exec(function(err, part) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(part);
		}
	});
};

/**
 * PartType middleware
 */
exports.partByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Part is invalid'
		});
	}

	Parts.findById(id).exec(function(err, part) {
		if (err) return next(err);
		if (!part) {
			return res.status(404).send({
  				message: 'Part not found'
  			});
		}
		req.parts = part;
		next();
	});
};

/**
 * PartType authorization middleware
 
exports.hasAuthorization = function(req, res, next) {
	/*if (req.PartType.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};*/
