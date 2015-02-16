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

	app.route('/inventory/add')
		.get(inventory.read)
		.put(inventory.update)
		.delete(inventory.delete);

	app.route('/inventory/remove')
		.get(inventory.read)
		.put(inventory.update)
		.delete(inventory.delete);

	app.route('/inventory/create')
		.get(inventory.read)
		.put(inventory.update)
		.delete(inventory.delete);

	app.route('/inventory/edit')
		.get(inventory.read)
		.put(inventory.update)
		.delete(inventory.delete);

	// Finish by binding the article middleware
	//app.param('id', partType.id);
};
