'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var missingPart = new Schema({
    _id: {type: Schema.Types.ObjectId},
    quantity: Number
});

/**
 * Kit schema
 */
var kitSchema = new Schema({
    /*    Need to add auto-increment from 1
     _id: {
     type: String,
     default: '',
     trim: true,
     required: 'Category can not be blank'
     },
     */
    missingParts: {
        type: [missingPart],
        default : null
    },
    serialNmbr: {
        type: String,
        default: '',
        trim: true,
        required: 'Kit must have a serial number'
    },
    kitTypeId: {
        type: Number,
        ref: 'KitType',
        required: 'Kit must have a Kit Type'
    },
    isSystem: {
        type: Boolean,
        default: false
    }
});

// A kit is considered "completed" if it does not have any missing parts
kitSchema.virtual('completed').get(function() {
    return this.missingParts.length === 0;
});

mongoose.model('Kit', kitSchema);
