'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Part type schema
 */
var partTypeSchema = new Schema({
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
    parts: {
        type: Object,
        default: 'N/A',
        trim: true
    }
});

mongoose.model('KitType', partTypeSchema);
