'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * System Schema
 */
var systemSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    kit: {
        type: Schema.ObjectId,
        ref: 'Kits'
    },
    comment: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('System', systemSchema);