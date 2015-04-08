'use strict';

angular.module('systems').controller('SystemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Systems',
    function($scope, $stateParams, $location, Authentication, Systems) {
        $scope.authentication = Authentication;
        $scope.remove = function(system) {
            if (system) {
                system.$remove();

                for (var i in $scope.systems) {
                    if ($scope.systems[i] === system) {
                        $scope.systems.splice(i, 1);
                    }
                }
            } else {
                $scope.system.$remove(function() {
                    $location.path('systems');
                });
            }
        };

        $scope.update = function() {
            var system = $scope.system;

            system.$update(function() {
                $location.path('systems');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.systems = Systems.query();
        };

        $scope.findOne = function() {
            $scope.system = Systems.get({
                systemTypeId: $stateParams.systemTypeId
            });
        };
    }
]);
