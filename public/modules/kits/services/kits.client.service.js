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

angular.module('kits').filter('gxType', function(){
	return function(input){
		return input === 0? 'GX-5' : 'GX-35';	
	};
});

angular.module('kits').filter('completed', function(){
	return function(input, complete){
		var output = [];
		if (complete){
			var i = 0;
			var l = input.length;
			for(i = 0; i < l; i++){
				if(!input[i].missingParts || input[i].missingParts.length === 0){
					output.push(input[i]);
				}
			}
		}
		else {
			var j = 0;
			var len = input.length;
			for(j = 0; j < len; j++){
				if(input[j].missingParts.length > 0){
					output.push(input[j]);
				}
			}
		}
		return output;
	};
});


angular.module('kits').filter('asPartName', function(){
	return function(input, reference){
		var i = 0;
		var l = reference.length;
		for(i = 0; i < l; i++){
			if(input === reference[i]._id){
				return reference[i].partName;
			}
		}
		return 'Could not find part name';
	};
});
