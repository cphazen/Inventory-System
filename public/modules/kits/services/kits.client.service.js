'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('kits').factory('Kit', ['$resource',
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
