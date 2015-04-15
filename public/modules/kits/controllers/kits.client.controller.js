'use strict';

var kits = angular.module('kits');

kits.controller('KitsController', [
	'$scope', '$stateParams', '$location', '$modal', 'Authentication', 'Kits', 'Inventory',
	function($scope, $stateParams, $location, $modal, Authentication, Kits, Inventory) {
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

		$scope.complete = function(kit) {
			var inventory = Inventory.query(function() {
				$scope.updateParts = {};
				$scope.missingParts = [];
				var i, part, missing, inventory_map = {};
				for (i in inventory) {
					inventory_map[inventory[i]._id] = inventory[i];
				}

				for (i in kit.missingParts) {
					missing = kit.missingParts[i];
					part = inventory_map[missing._id];
					$scope.missingParts.push({
						quantity: missing.quantity,
						available: part.quantity,
						name: part.partName
					});
					if (part.quantity > 0)
						$scope.updateParts[missing._id] = Math.min(part.quantity, missing.quantity);
				}

				// $scope.updateParts is an object with the ID of each part we can add as the key and the quantity of parts we can add as the value.
				console.log($scope.updateParts);
				$modal.open({
					templateUrl: 'missingPartsModal.html',
					controller: 'missingPartsModal',
					resolve: {
						parts: function() {
							return $scope.missingParts;
						}
					}
				}).result.then(function (parts) {
					kit.missingParts = [];
					kit.$update();
				});
			});
		};

		$scope.makeSystem = function(kit) {
			kit.isSystem = true;
			kit.$update(function() {}, function(errorResponse) {
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

kits.controller('missingPartsModal', function($scope, $modalInstance, parts) {
	$scope.parts = parts;

	$scope.ok = function() {
		$modalInstance.close($scope.parts);
	};

	$scope.cancel = function() {
		console.log($scope.parts);
		$modalInstance.dismiss('cancel');
	};
});
