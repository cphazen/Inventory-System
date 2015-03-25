'use strict';

angular.module('inventory').controller('InventoryController', ['$scope', '$stateParams', '$location', 'Authentication', 'Inventory', '$window',
	function($scope, $stateParams, $location, Authentication, Inventory, $window) {
		$scope.authentication = Authentication;

        $scope.create = function() {
            var partType = new Inventory({
                category: this.category,
                partName: this.partName,
                vendor: this.vendor,
                vndrPartNmbr: this.vndrPartNmbr,
                manufacturer: this.manufacturer,
                mnfPartNmbr: this.mnfPartNmbr,
                price: this.price,
                GX5_amount: this.GX5_amount,
                GX35_amount: this.GX35_amount,
                quantity: this.quantity
            });
            //$location.path('inventory');
            partType.$save(function() {
                $location.path('inventory');
                $scope.category = '';
                $scope.partName = '';
                $scope.vendor = '';
                $scope.vndrPartNmbr = '';
                $scope.manufacturer = '';
                $scope.mnfPartNmbr = '';
                $scope.price = '';
                $scope.GX5_amount = '';
                $scope.GX35_amount = '';
                $scope.quantity = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

		$scope.remove = function(partType) {
			if (partType) {
				partType.$remove();

				for (var i in $scope.inventory) {
					if ($scope.inventory[i] === partType) {
						$scope.inventory.splice(i, 1);
					}
				}
			} else {
				$scope.partType.$remove(function() {
					$location.path('inventory');
				});
			}
		};

        $scope.update = function() {
            var partType = $scope.partType;

            partType.$update(function() {
                $location.path('inventory');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

		$scope.updateQuantity = function (partType, newVal){
			// only for parts that do NOT use part schema
			partType.quantity = newVal;
			partType.$update(partType, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.updateInline = function(partType) {
			partType.$update(partType, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };
		
		$scope.find = function() {
			$scope.inventory = Inventory.query();
		};

		$scope.findOne = function() {
			$scope.partType = Inventory.get({
				partId: $stateParams.partId
			});
		};	
		
		// SORT
		$scope.partSort = 'category';
		$scope.partReverse = false;
			
		$scope.newWorldOrder = function(attribute){
			// if attempted sort is selected, reverse order
			if($scope.partSort === attribute){
				$scope.partReverse = !$scope.partReverse;
			}
			// if attempted sort is not selected, change and unreverse order
			else{
				$scope.partSort = attribute;
				$scope.partReverse = false;
			}
		};
		
		$scope.chevron = function(attribute){
			if($scope.partSort === attribute && $scope.partReverse === true) return 'glyphicon-chevron-down';
			else if($scope.partSort === attribute) return 'glyphicon-chevron-up';
		};
		
		// SEARCH
		$scope.partQuery = '';
		
		// XEDITABLE
		$scope.categories = ['Main Component', 'Fasteners and Mounting Hardware', 'Cables and Wires', 'K-sun Labels', 'External Components'];
		
		// remove part
		$scope.removePart = function(partType){
			//$scope.inventory.splice(index,1);
			var rem = $window.confirm('Are you sure you want to permanently delete "' + partType.partName + '"?');
			if(rem) $scope.remove(partType);
		};
		
		// add part
		/*$scope.addPart = function(){
			var partType2 = new Inventory({
                category: '/',
                partName: 'New Part',
                vendor: '',
                vndrPartNmbr: '',
                manufacturer: '',
                mnfPartNmbr: '',
                price: '0',
                GX5_amount: '0',
                GX35_amount: '0',
                quantity: '0'
				});
				partType2.$save(function() {
					$location.path('inventory');
					$scope.category = '';
					$scope.partName = '';
					$scope.vendor = '';
					$scope.vndrPartNmbr = '';
					$scope.manufacturer = '';
					$scope.mnfPartNmbr = '';
					$scope.price = '';
					$scope.GX5_amount = '';
					$scope.GX35_amount = '';
					$scope.quantity = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
					$window.alert($scope.error);
				});
			$scope.inserted = {
                category: '/',
                partName: 'New Part',
                vendor: '',
                vndrPartNmbr: '',
                manufacturer: '',
                mnfPartNmbr: '',
                price: '0',
                GX5_amount: '0',
                GX35_amount: '0',
                quantity: '0'
			};
			$scope.inventory.splice(0,0,$scope.inserted);
		}*/
	}
]);
