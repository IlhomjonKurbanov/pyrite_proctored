// consentController.js
// ====================
// controller for 'consent' view

angular.module('pyrite')
    .controller('consentController', ['$scope', '$window', '$location', 'appConfig',
                                      'cookieService', 'progressService', 'dbService',
        function($scope, $window, $location, appConfig, cookieService, progressService, dbService) {
            //page data setup
            var d = new Date();
            $scope.today = d.toLocaleDateString();
            $scope.hasConsented = false;

            //submit a subject's consent
            $scope.submitConsent = function() {
                $scope.hasConsented = true;
            };

            //download "signed" consent form
            $scope.downloadConsent = function() {
                $window.open(appConfig.PATH + "api/download-consent", "_blank");
            };

            $scope.continue = function() {
                progressService.setStage('demographics'); //advance user to introduction stage
                $location.path('/demographics');
            }
        }
    ]);
