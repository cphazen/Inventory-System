'use strict';

angular.module('kits').controller('KitsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Kits',
	function($scope, $stateParams, $location, Authentication, Kits) {
		$scope.authentication = Authentication;

        $scope.create = function() {
            var kit = new Kits({
                serialNmbr: this.serialNmbr,
                kitTypeId: this.kitTypeId
                //missingParts: this.missingParts,
                //isSystem: this.isSystem
            });
            //$location.path('kits');
            kit.$save(function() {
                $location.path('kits');
                $scope.serialNmbr = '';
                $scope.kitTypeId = '';
                //$scope.missingParts = '';
                //$scope.isSystem = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

		$scope.remove = function(kit) {
			if (kit) {
				kit.$remove();

				for (var i in $scope.kits) {
					if ($scope.kits[i] === kit) {
						$scope.kits.splice(i, 1);
					}
				}
			} else {
				$scope.kit.$remove(function() {
					$location.path('kits');
				});
			}
		};


        $scope.update = function() {
            var kit = $scope.kit;

            kit.$update(function() {
                $location.path('kits');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

		$scope.find = function() {
			$scope.kits = Kits.query();
		};

		$scope.findOne = function() {
			$scope.kit = Kits.get({
				kitTypeId: $stateParams.kitTypeId
			});
		};
	}
]);
