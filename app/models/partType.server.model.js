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
	Category: {
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
	Vendor: {
		type: String,
		default: 'N/A',
		trim: true
	},
	vndrPartNmbr: {
		type: String,
		default: 'N/A',
		trim: true
	},
	Manufacturer: {
		type: String,
		default: 'N/A',
		trim: true
	},
	mnfPartNmbr: {
		type: String,
		default: 'N/A',
		trim: true
	},
	price: {
		type: Number,
		default: 0,
		required: 'Part must have a price'
	},
	amount: {
		type: Number,
		default: 1,
		required: 'Part must have an amount'
	}
});

mongoose.model('PartType', partTypeSchema);

