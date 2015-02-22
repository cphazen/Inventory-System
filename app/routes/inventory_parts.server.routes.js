'use strict';

/**
 * Module dependencies.
 */
var parts = require('../../app/controllers/inventory_parts.server.controller');

module.exports = function(app) {
    // PartType Routes
    app.route('/inventory_parts')
        .get(parts.list)
        .post(parts.create);

    app.route('/inventory_parts/:partId')
        .get(parts.read)
        .put(parts.update)
        .delete(parts.delete);


    // Finish by binding the article middleware
    app.param('partId', parts.partByID);
};
