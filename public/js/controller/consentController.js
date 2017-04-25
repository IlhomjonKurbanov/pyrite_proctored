// consentController.js
// ====================
// controller for 'consent' view

angular.module('pyrite')
    .controller('consentController', ['$scope', '$window', '$cookies', 'appConfig', 'dbService',
        function($scope, $window, $cookies, appConfig, dbService) {
            //page data setup
            var d = new Date();
            $scope.today = d.toLocaleDateString();
            $scope.hasConsented = false;

            //submit a subject's consent, thereby creating Subject object
            $scope.submitConsent = function() {
                $scope.hasConsented = true;
                $cookies.put('hasConsented', true);
            };

            //download "signed" consent form
            $scope.downloadConsent = function() {
                $window.open(appConfig.PATH + "api/download-consent", "_blank");
            };
        }
    ]);
