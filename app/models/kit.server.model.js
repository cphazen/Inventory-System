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
        ref: 'KitType'
    },
    isSystem: {
        type: Boolean,
        default: false
    }

});

mongoose.model('Kit', kitSchema);
