// reviewController.js
// ===================
// controller for 'review' view

angular.module('pyrite')
    .controller('reviewController', ['$scope', '$location', 'progressService',
        function($scope, $location, progressService) {
            //TODO update progress.index when submitting responses, make associated changes in appRoutes.js

            $scope.continue = function() {
                progressService.setStage('finished');
                $location.path('/prize');
            }
    }]);
