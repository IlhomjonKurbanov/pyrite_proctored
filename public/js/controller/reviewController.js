// reviewController.js
// ===================
// controller for 'review' view

angular.module('pyrite')
    .controller('reviewController', ['$scope', '$routeParams', '$location', 'appConfig',
                                     'progressService', 'cookieService', 'dbService',
        function($scope, $routeParams, $location, appConfig, progressService,
                 cookieService, dbService) {
            //TODO update progress.index when submitting responses, make associated changes in appRoutes.js
            var allResponses;
            var responses_promise = dbService.getSpontaneousResponses({subjectID: cookieService.getSubjectID()});
            responses_promise.then(function(responses) {
                allResponses = responses;
            });

            $scope.continue = function() {
                progressService.setStage('finished');
                $location.path('/prize');
            }
    }]);
