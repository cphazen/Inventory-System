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
	category: {
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
	},
	manufacturer: {
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
	GX5_amount: {
		type: Number,
		default: 0,
		required: 'Part must have an amount'
	},
	GX35_amount: {
		type: Number,
		default: 0,
		required: 'Part must have an amount'
	},
	quantity: {
		type: Number,
		default: 0
	},
	hasSerialNmbr: {
		type: Boolean,
		default: false
	}
});

mongoose.model('PartType', partTypeSchema);

