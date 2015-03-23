'use strict';

/**
 * Module dependencies.
 */
var kits = require('../../app/controllers/kits.server.controller');

module.exports = function(app) {
    // PartType Routes
    app.route('/kits')
        .get(kits.list)
        .post(kits.create);

    app.route('/kits/:kitId')
        .get(kits.read)
        .put(kits.update)
        .delete(kits.delete);


    // Finish by binding the article middleware
    app.param('kitId', kits.kitByID);
};
