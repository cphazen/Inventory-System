'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/*
	schema for individual parts
*/
var partSchema = new Schema({
	serialNmbr: {
		type: String,
		default: '',
		trim: true
	},
	firmWare: {
		type: String,
		default: '',
		trim: true
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PartType',
		required: 'Part must have a type'
	}
});
partSchema.set('collection', 'parts');
mongoose.model('Parts', partSchema);
