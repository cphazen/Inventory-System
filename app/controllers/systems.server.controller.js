'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    System = mongoose.model('Kit'),
    _ = require('lodash');


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
 * List of Systems
 */
exports.list = function(req, res) {
    System.find({isSystem : true}).exec(function(err, systems) {
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

    System.find({isSystem : true}).findById(id).exec(function(err, system) {
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
