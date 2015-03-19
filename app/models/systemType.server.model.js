    'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Part type schema
 */
var systemTypeSchema = new Schema({
	name: {
		type: String,
		default: 'N/A',
		trim: true,
		required: 'Category can not be blank'
	},
	
	partList: {
		type: Object
	}
});

mongoose.model('SystemType', systemTypeSchema);

