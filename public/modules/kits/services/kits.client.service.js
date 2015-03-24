'use strict';

//kits service used for communicating with the kits REST endpoints
angular.module('kits').factory('Kits', ['$resource',
	function($resource) {
		return $resource('kits/:kitId', {
			kitId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
