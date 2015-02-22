'use strict';

// Setting up route
//routes: add part, remove part, create part, edit part
angular.module('inventory').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider) {
		// inventory state routing
		$stateProvider.
		state('createPart', {
			url: '/inventory/create',
			templateUrl: 'modules/inventory/views/create.client.view.html'
		}).
		state('editPart', {
			url: '/inventory/:partId/edit',
			templateUrl: 'modules/inventory/views/edit.client.view.html'
		}).
		state('listInventory', {
			url: '/inventory',
			templateUrl: 'modules/inventory/views/inventory.client.view.html'
		}).
		state('addInventory', {
			url: '/inventory/add/:partId',
			templateUrl: 'modules/inventory/views/add.client.view.html'
		});
	}
]);
