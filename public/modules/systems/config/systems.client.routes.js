'use strict';

// Setting up route
angular.module('systems').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider) {
        // systems state routing
        $stateProvider.
            state('editSystem', {
                url: '/systems/:systemId/edit',
                templateUrl: 'modules/systems/views/edit.client.view.html'
            }).
            state('listSystems', {
                url: '/systems',
                templateUrl: 'modules/systems/views/systems.client.view.html'
            });
    }
]);
