'use strict';

angular.module('parts').controller('PartsController', ['$scope', '$modalInstance', 'Parts', 'partType',
    function($scope, $modalInstance, Parts, partType) {

        $scope.sn = {};
        $scope.sn.serialNmbrs = [];

        
        var oldParts = [];
        var p = Parts.query(
            function (data) {
                var theseParts = [];
                var l = data.length;
				for (var i = 0; i < l; i++) {
                    if (data[i].Type == partType._id) {
                        theseParts.push(data[i].serialNmbr);
                        oldParts.push(data[i]);
                    }
                }
                $scope.sn.serialNmbrs = theseParts;
            }
        );
        $scope.oldParts = oldParts;


        $scope.updateToMatch = function () {
            var l_old = oldParts.length;
            var l_new = $scope.sn.serialNmbrs.length;
            var found;
            //console.log('i run');
            //removals
            // for all in old array
            for (var i = 0; i < l_old; i++) {
                //console.log('i loop');
                found = false;
                //check if exists in new array
                for (var j = 0; j < l_new; j++) {
                    // break if found
                    if (oldParts[i].serialNmbr === $scope.sn.serialNmbrs[j]) {
                        found = true;
                        break;
                    }
                }

                console.log(found);
                // remove from db if not found
                if (!found) {
                    //console.log('i remove');
                    oldParts[i].$remove(function () {
                        //subtract from quantity
                        partType.quantity -= 1;
                        partType.$update(function (errorResponse) {
                            $scope.error = errorResponse.data.message;
                        });
                    });
                }
            }

            // add all
            for (var i = 0; i < l_new; i++) {
                found = false;
                //check if exists in new array
                for (var j = 0; j < l_old; j++) {
                    //break if found
                    if (oldParts[j].serialNmbr === $scope.sn.serialNmbrs[i]) {
                        found = true;
                        break;
                    }
                }
                // add to db if not found
                if (!found) {
                    //console.log('i add');
                    var part = new Parts({
                        serialNmbr: $scope.sn.serialNmbrs[i],
                        Type: partType._id
                    });

                    part.$save(function () {
                        //add to quantity
                        partType.quantity += 1;
                        partType.$update(function (errorResponse) {
                            $scope.error = errorResponse.data.message;
                        });
                    }, function (errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                }
            }

            $scope.sn.serialNmbrs = [];
            $modalInstance.close();
        }
        
        //console.log(partType._id);

        $scope.create = function(){
            //console.log(partType + ' SERIAL NUMBER: ' + this.serialNmbr);

            var part = new Parts({
                serialNmbr: this.serialNmbr,
                Type: partType._id
            });

            part.$save(function() {
                $scope.serialNmbr = '';
                partType.quantity += 1;
                partType.$update(function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            $modalInstance.close();
        };




     $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
     };

}]);
