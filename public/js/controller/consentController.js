angular.module('pyrite')
    .controller('consentController', ['$scope', '$window', 'appConfig', 'dbService',
        function($scope, $window, appConfig, bService) {
            //page data setup
            var d = new Date();
            $scope.today = d.toLocaleDateString();
            $scope.consentSigned = false;

            $scope.downloadConsent = function() {
                $window.open(appConfig.PATH + "download-consent", "_blank");
            };
        }
    ]);
