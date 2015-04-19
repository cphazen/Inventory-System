'use strict';

//Parts service used for communicating with the Parts REST endpoints
angular.module('parts').factory('Parts', ['$resource',
    function($resource) {
        return $resource('parts/:partId', {
            partId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
