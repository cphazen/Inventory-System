'use strict';

// Setting up route
angular.module('partTypes').config(['$stateProvider',
	function($stateProvider) {
		// Parts state routing
		$stateProvider.
		state('listParts', {
			url: '/parts',
			templateUrl: 'modules/parts/views/list-parts.client.view.html'
		}).
		state('createPart', {
			url: '/parts/create',
			templateUrl: 'modules/parts/views/create-part.client.view.html'
		}).
		state('viewPart', {
			url: '/parts/:partId',
			templateUrl: 'modules/parts/views/view-part.client.view.html'
		}).
		state('editPart', {
			url: '/parts/:partId/edit',
			templateUrl: 'modules/parts/views/edit-part.client.view.html'
		});
	}
]);
