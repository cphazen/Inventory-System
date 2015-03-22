'use strict';

// Setting up route
angular.module('kits').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider) {
		// kits state routing
		$stateProvider.
		state('createKit', {
			url: '/kits/create',
			templateUrl: 'modules/kits/views/create.client.view.html'
		}).
		state('editKit', {
			url: '/kits/:kitId/edit',
			templateUrl: 'modules/kits/views/edit.client.view.html'
		}).
		state('listKits', {
			url: '/kits',
			templateUrl: 'modules/kits/views/kits.client.view.html'
		});
	}
]);
