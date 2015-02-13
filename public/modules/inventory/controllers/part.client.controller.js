'use strict';

angular.module('parts').controller('PartsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Parts',
	function($scope, $stateParams, $location, Authentication, parts) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var part = new Parts({
				title: this.title
			});
			part.$save(function(response) {
				$location.path('parts/' + response._id);

				$scope.title = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(part) {
			if (part) {
				part.$remove();

				for (var i in $scope.parts) {
					if ($scope.parts[i] === part) {
						$scope.parts.splice(i, 1);
					}
				}
			} else {
				$scope.part.$remove(function() {
					$location.path('parts');
				});
			}
		};

		$scope.update = function() {
			var part = $scope.part;

			part.$update(function() {
				$location.path('parts/' + part._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.parts = parts.query();
		};

		$scope.findOne = function() {
			$scope.part = parts.get({
				partId: $stateParams.partId
			});
		};
	}
]);
