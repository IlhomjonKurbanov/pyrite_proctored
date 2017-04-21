// prizeController.js
// ==================
// controller for 'prize' view

angular.module('pyrite')
    .controller('prizeController', ['$scope', '$location', 'dbService',
    function($scope, $location, dbService) {
        $scope.emailUndefined = function() {
            return ($scope.email == undefined);
        }

        $scope.registerPrizeDrawingParticipant = function() {
            dbService.registerPrizeDrawingParticipant({email: $scope.email});
            $location.path('/end');
        }
    }]);
