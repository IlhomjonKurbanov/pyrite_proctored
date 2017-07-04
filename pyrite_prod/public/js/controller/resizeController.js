// resizeController.js
// ====================
// controller for 'consent' view

angular.module('pyrite')
    .controller('resizeController', ['$scope', '$window', '$location', 'resizeService',
        function($scope, $window, $location, resizeService) {
            $scope.loading = true;
            $scope.idealSize = false;
            $scope.ideal = resizeService.getIdealDimensions();
            $scope.width = {
                invalid   : true,
                val       : 'undefined',
                direction : 'undefined'
            }
            $scope.height = {
                invalid   : true,
                val       : 'undefined',
                direction : 'undefined'
            }

            $scope.bothInvalid = function() {
                return ($scope.width.invalid && $scope.height.invalid);
            }

            function updateVal() {
                $scope.width.val = $window.innerWidth;
                if ($scope.width.val > $scope.ideal.width.max) {
                    $scope.idealSize = false;
                    $scope.width.invalid = true;
                    $scope.width.direction = 'decrease';
                } else if ($scope.width.val < $scope.ideal.width.min) {
                    $scope.idealSize = false;
                    $scope.width.invalid = true;
                    $scope.width.direction = 'increase';
                } else {
                    $scope.width.invalid = false;
                }

                $scope.height.val = $window.innerHeight;
                if ($scope.height.val > $scope.ideal.height.max) {
                    $scope.idealSize = false;
                    $scope.height.invalid = true;
                    $scope.height.direction = 'decrease';
                } else if ($scope.height.val < $scope.ideal.height.min) {
                    $scope.idealSize = false;
                    $scope.height.invalid = true;
                    $scope.height.direction = 'increase';
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
                $location.path(resizeService.getOrigin());
            }
        }
    ]);
