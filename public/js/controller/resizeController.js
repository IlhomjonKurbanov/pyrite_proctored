// resizeController.js
// ====================
// controller for 'consent' view

angular.module('pyrite')
    .controller('resizeController', ['$scope', '$window', '$location', 'resizeService',
        function($scope, $window, $location, resizeService) {
            $scope.loading = true;
            $scope.idealSize = false;
            $scope.minimum = resizeService.getMinimums();
            $scope.width = {
                invalid   : true,
                val       : 'undefined',
            }
            $scope.height = {
                invalid   : true,
                val       : 'undefined',
            }

            $scope.bothInvalid = function() {
                return ($scope.width.invalid && $scope.height.invalid);
            }

            function updateVal() {
                $scope.width.val = $window.innerWidth;
                if ($scope.width.val < $scope.minimum.width) {
                    $scope.idealSize = false;
                    $scope.width.invalid = true;
                } else {
                    $scope.width.invalid = false;
                }

                $scope.height.val = $window.innerHeight;
                if ($scope.height.val < $scope.minimum.height) {
                    $scope.idealSize = false;
                    $scope.height.invalid = true;
                } else {
                    $scope.height.invalid = false;
                }

                if (!$scope.width.invalid && !$scope.height.invalid) $scope.idealSize = true;
            }

            updateVal();
            window.addEventListener('resize', function(event){
                updateVal();
                $scope.$apply();
            });
            $scope.loading = false;

            $scope.continue = function() {
                $location.path(cookieService.getOrigin());
            }
        }
    ]);
