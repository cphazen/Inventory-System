'use strict';

/**
 * Module dependencies.
 */
var kitType = require('../../app/controllers/kits.server.controller');

module.exports = function(app) {
    // PartType Routes
    app.route('/kits')
        .get(kitType.list)
        .post(kitType.create);

    app.route('/kits/:kitId')
        .get(kitType.read)
        .put(kitType.update)
        .delete(kitType.delete);


    // Finish by binding the article middleware
    app.param('kitId', kitType.kitTypeByID);
};
