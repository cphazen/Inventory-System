'use strict';

/**
 * Module dependencies.
 */
var mongoose        = require('mongoose'),
    errorHandler    = require('./errors.server.controller'),
    KitType        = mongoose.model('KitType'),
    _               = require('lodash');

/**
 * Create a KitType
 */
exports.create = function(req, res) {
    var kitType = new KitType(req.body);

    kitType.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(kitType);
        }
    });
};

/**
 * Show the current KitType
 */
exports.read = function(req, res) {
    res.json(req.kitType);
};

/**
 * Update a KitType
 */
exports.update = function(req, res) {
    var kitType = req.kitType;

    kitType = _.extend(kitType, req.body);

    kitType.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(kitType);
        }
    });
};

/**
 * Delete an KitType
 */
exports.delete = function(req, res) {
    var kitType = req.kitType;

    kitType.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(kitType);
        }
    });
};


/**
 * List of KitTypes
 */
exports.list = function(req, res) {
    /**
     * This needs to be fixed
     */
    KitType.find().exec(function(err, kitTypes) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(kitTypes);
        }
    });
};

/**
 * KitType middleware
 */
exports.kitTypeByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'KitType is invalid'
        });
    }

    KitType.findById(id).exec(function(err, kitType) {
        if (err) return next(err);
        if (!kitType) {
            return res.status(404).send({
                message: 'KitType not found'
            });
        }
        req.kitType = kitType;
        next();
    });
};

