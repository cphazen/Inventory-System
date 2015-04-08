'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    _System = mongoose.model('System'),
    _ = require('lodash');

/**
 * Create a system
 */
exports.create = function(req, res) {
    var system = new _System(req.body);
    system.user = req.user;

    system.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(system);
        }
    });
};

/**
 * Show the current system
 */
exports.read = function(req, res) {
    res.json(req.system);
};

/**
 * Update a system
 */
exports.update = function(req, res) {
    var system = req.system;

    system = _.extend(system, req.body);

    system.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(system);
        }
    });
};

/**
 * Delete an system
 */
exports.delete = function(req, res) {
    var system = req.system;

    system.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(system);
        }
    });
};

/**
 * List of aSystems
 */
exports.list = function(req, res) {
    _System.sort('-created').populate('kit', 'serialNmbr').exec(function(err, systems) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(systems);
        }
    });
};

/**
 * System middleware
 */
exports.systemByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'System is invalid'
        });
    }

    _System.findById(id).populate('kit', 'serialNmbr').exec(function(err, system) {
        if (err) return next(err);
        if (!system) {
            return res.status(404).send({
                message: 'System not found'
            });
        }
        req.system = system;
        next();
    });
};
