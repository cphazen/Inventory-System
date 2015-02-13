'use strict';

/**
 * Module dependencies.
 */
var inventory = require('../../app/controllers/inventory.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/inventory')
		.get(inventory.list)
		.post(inventory.create);

	app.route('/parts/:id')
		.get(inventory.read)
		.put(inventory.update)
		.delete(inventory.delete);

	// Finish by binding the article middleware
	//app.param('id', partType.id);
};
