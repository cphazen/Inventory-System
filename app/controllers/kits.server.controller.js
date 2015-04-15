'use strict';

/**
 * Module dependencies.
 */
var mongoose        = require('mongoose'),
    errorHandler    = require('./errors.server.controller'),
    Kit             = mongoose.model('Kit'),
    KitType         = mongoose.model('KitType'),
    PartType        = mongoose.model('PartType'),
    async           = require('async'),
    _               = require('lodash');

/**
 * Create a Kit
 */
exports.create = function(req, res) {
    var missingParts = [];

    KitType.findById(req.body.kitTypeId, function(err, kitType){
        if(err) return console.log(err);
        //console.log('The ID: '+ req.body.._id);
        if(kitType){
            async.forEach(kitType.requiredParts, function (requiredPart, callback) {
                    //console.log(requiredPart._id);
                    PartType.findById(requiredPart._id, function(err, partType){
                        //console.log('i: ' + partType);
                        //if (err) return console.log(err);
                        var qty = partType.quantity - requiredPart.quantity;
                        if(qty >= 0){
                            partType.quantity = qty;
                            partType.save(function(err){
                                if (err) {
                                    return res.status(400).send({
                                        message: errorHandler.getErrorMessage(err)});}
                            });
                        }
                        else{
                            partType.quantity = 0;
                            partType.save(function(err){
                                if (err) {
                                    return res.status(400).send({
                                        message: errorHandler.getErrorMessage(err)});}
                            });
                            qty = qty * -1; //make positive
                            missingParts.push({_id : requiredPart._id, quantity:qty});
                        }
                        callback();
                    });
                }, function(err){
                    if (err) return console.log(err);
                    var kit = new Kit(
                        {
                            missingParts: missingParts,
                            serialNmbr : req.body.serialNmbr,
                            kitTypeId : req.body.kitTypeId,
                            isSystem : false
                        }
                    );

                    kit.save(function(err) {
                        if (err) {
                            return res.status(400).send({
                                message: errorHandler.getErrorMessage(err)
                            });
                        } else {
                            res.json(kit);
                        }
                    });
                }
            );
        } else {
            console.log('Error: kitTypeId invalid. Missing parts can not be updated.');
        }
    });
};

/**
 * Show the current Kit
 */
exports.read = function(req, res) {
    res.json(req.kit);
};

/**
 * Update a Kit
 */
exports.update = function(req, res) {
    var kit = req.kit;

    //console.log(kit);

    var newMissingParts = [];

    async.forEach(kit.missingParts, function (missingPart, callback) {
        PartType.findById(missingPart._id, function (err, partType) {
            //console.log('i: ' + partType);
            //if (err) return console.log(err);
            var qty = partType.quantity - missingPart.quantity;
            //console.log(partType.quantity + ' - ' + missingPart.quantity + ' = ' + qty);
            if (qty >= 0) {
                partType.quantity = qty;
                partType.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                });
            }
            else {
                partType.quantity = 0;
                partType.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                });
                qty = qty * -1; //make positive
                newMissingParts.push({_id: missingPart._id, quantity: qty});
            }
            callback();
        });
        }, function(err){
            if (err) return console.log(err);

            kit = _.extend(kit, req.body);
            kit.missingParts = newMissingParts;

            kit.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(kit);
                }
            });
        });
};

/**
 * Delete an Kit
 */
exports.delete = function(req, res) {
    var kit = req.kit;

    kit.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(kit);
        }
    });
};


/**
 * List of Kits
 */
exports.list = function(req, res) {
    /**
     * This needs to be fixed
     */
    Kit.find().exec(function(err, kits) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(kits);
        }
    });
};

/**
 * Kit middleware
 */
exports.kitByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Kit is invalid'
        });
    }

    Kit.findById(id).exec(function(err, kit) {
        if (err) return next(err);
        if (!kit) {
            return res.status(404).send({
                message: 'Kit not found'
            });
        }
        req.kit = kit;
        next();
    });
};

