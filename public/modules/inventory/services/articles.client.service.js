'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('inventory').factory('Inventory', ['$resource',
	function($resource) {
		return $resource('inventory/:inventoryId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
