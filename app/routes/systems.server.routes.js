'use strict';

/**
 * Module dependencies.
 */
var systems = require('../../app/controllers/systems.server.controller');

module.exports = function(app) {
    // System Routes
    app.route('/systems')
        .get(systems.list)

    app.route('/systems/:systemId')
        .get(systems.read)
        .put(systems.update)
        .delete(systems.delete);

    // Finish by binding the system middleware
    app.param('systemId', systems.systemByID);
};