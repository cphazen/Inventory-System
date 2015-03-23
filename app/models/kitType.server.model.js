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
/*    Need to add auto-increment from 1
    _id: {
        type: String,
        default: '',
        trim: true,
        required: 'Category can not be blank'
    },
    */
    kitName: {
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
