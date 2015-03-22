'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    //KitType = mongoose.model('KitType'),
    Schema = mongoose.Schema;

/* Setters and Getters - might need this for missingParts implementation
function getKitTypeName (id){
    return 'test' + id;
    //return this.populate('kitTypeId').kitName;
}
function getMissingParts(parts){

};
 */

var missingPart = new Schema({
    _id: {type: Schema.Types.ObjectId, required: true, ref: 'PartType'},
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
    serialNmbr: {
        type: String,
        default: '',
        trim: true,
        required: 'Kit must have a serial number'
    },
    kitTypeId: {
        type: Schema.ObjectId,
        //get: getKitTypeName,
        ref: 'KitType'
    },
    missingParts: {
        type: [missingPart]
        //set: getMissingParts
    },
    isSystem: {
        type: Boolean,
        default: false
    }

}/*, {
    toObject : {getters: true, setters: true},
    toJSON : {getters: true, setters: true}
}*/);

mongoose.model('Kit', kitSchema);
