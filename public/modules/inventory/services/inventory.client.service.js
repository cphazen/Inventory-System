'use strict';

//Inventory service used for communicating with the inventory REST endpoints
angular.module('inventory').factory('Inventory', ['$resource',
	function($resource) {
		return $resource('inventory/:partId', {
			partId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
