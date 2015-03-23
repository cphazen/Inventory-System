'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var requiredPart = new Schema({
    _id: {type: Schema.Types.ObjectId, required: true, ref: 'PartType'},
    quantity: Number
});

/**
 * Kit type schema
 */
var kitTypeSchema = new Schema({
    _id: Number,
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Kit must have a name'
    },
    requiredParts: {
        type: [requiredPart],
        default: null
    }
});

mongoose.model('KitType', kitTypeSchema);
