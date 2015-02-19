'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/*
	schema for system
*/

var SystemSchema = new Schema({
	System: {
		type: String,
		default '',
		trim: true
	},
	Type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PartType',
		required: 'You need to choose a part type'
	},
	amount: {
		type: Number,
		default: 0
	}
});

mongoose.model('System', InventorySchema);
