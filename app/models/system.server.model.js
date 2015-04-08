'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * System Schema
 */
var SystemSchema = new Schema({
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

mongoose.model('System', SystemSchema);