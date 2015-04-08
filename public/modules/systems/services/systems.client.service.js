'use strict';

//systems service used for communicating with the systems REST endpoints
angular.module('systems').factory('Systems', ['$resource',
    function($resource) {
        return $resource('systems/:systemId', {
            systemId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
