'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('inventory').factory('InventoryParts', ['$resource',
	function($resource) {
		return $resource('inventory_parts/:partId', {
			partId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
