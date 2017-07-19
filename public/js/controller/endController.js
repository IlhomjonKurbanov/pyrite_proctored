// endController.js
// ================
// controller for 'end' view

angular.module('pyrite')
    .controller('endController', ['$scope', '$location', 'cookieService', 'progressService',
        function($scope, $location, cookieService, progressService) {
            $scope.subjectID = cookieService.getSubjectID() || 'undefined';

            $scope.restart = function() {
                //clean up and restart
                cookieService.cleanUp(['subjectID', 'articleOrder', 'progress']);

                progressService.setStage('unstarted');
                progressService.setArticleIndex('demo1');
                $location.path('/');
            }
        }]);
