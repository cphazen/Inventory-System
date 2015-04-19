'use strict';

/**
 * Module dependencies.
 */
var parts = require('../../app/controllers/parts.server.controller.js');

module.exports = function(app) {
    // PartType Routes
    app.route('/parts')
        .get(parts.list)
        .post(parts.create);

    app.route('/parts/:partId')
        .get(parts.read)
        .put(parts.update)
        .delete(parts.delete);


    // Finish by binding the article middleware
    app.param('partId', parts.partByID);
};
