'use strict';

/**
 * Module dependencies.
 */
var partType = require('../../app/controllers/inventory.server.controller');

module.exports = function(app) {
    // PartType Routes
    app.route('/inventory')
        .get(partType.list)
        .post(partType.create);

    app.route('/inventory/:inventoryItemId')
        .get(partType.read)
        .put(partType.update)
        .delete(partType.delete);


    // Finish by binding the article middleware
    app.param('inventoryItemId', partType.partTypeByID);
};
