'use strict';

// Setting up route
//routes: add part, remove part, create part, edit part
angular.module('inventory').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider) {
		// inventory state routing
		$stateProvider.
		state('addPart', {
			url: '/inventory/add',
			templateUrl: 'modules/inventory/views/add.client.view.html'
		}).
		state('removePart', {
			url: '/parts/remove',
			templateUrl: 'modules/inventory/views/remove.client.view.html'
		}).
		state('createPart', {
			url: '/parts/create',
			templateUrl: 'modules/inventory/views/create.client.view.html'
		}).
		state('editPart', {
			url: '/inventory/edit',
			templateUrl: 'modules/inventory/views/edit.client.view.html'
		}).
		state('listInventory', {
			url: '/inventory',
			templateUrl: 'modules/inventory/views/inventory.client.view.html'
		});
	}
]);
