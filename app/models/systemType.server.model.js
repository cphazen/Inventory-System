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
	partName: {
		type: String,
		default: '',
		trim: true,
		required: 'Part must have a name'
	},
	vendor: {
		type: String,
		default: 'N/A',
		trim: true
	},
	vndrPartNmbr: {
		type: String,
		default: 'N/A',
		trim: true
	}
});

mongoose.model('SystemType', systemTypeSchema);

