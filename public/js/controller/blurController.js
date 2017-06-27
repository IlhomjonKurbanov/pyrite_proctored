// blurController.js
// =================
// controller for 'blur' view

angular.module('pyrite')
    .controller('blurController', ['$scope',
        function($scope) {
            function downloadGeneratedImage(filename) {
                var canvas = document.getElementById('canvas');
                canvas.toBlob(function(blob) {
                    saveAs(blob, filename);
                });
            }

            $scope.uploadImages = function(numberOfImages) {
                if ($scope.num == undefined || $scope.num == NaN) {
                    $scope.uploadError = "INVALID INPUT";
                } else {
                    $scope.uploadError = "";
                    $scope.images = new Array();
                    for (var i = 1; i <= numberOfImages; i++) {
                        $scope.images.push('data/blur_input/img' + i + '.jpg');
                    }
                }
            }

            $scope.blur = function() {
                if ($scope.radius == undefined || $scope.radius == NaN) {
                    $scope.blurError = "INVALID INPUT";
                } else {
                    $scope.error = "";
                    for (var i = 1; i <= $scope.images.length; i++) {
                        console.log('index ' + i);
                        stackBlurImage('img' + i, 'canvas', $scope.radius, false);
                        downloadGeneratedImage('img' + i + '_blurred.png');
                        console.log('blurred ' + i);
                    }
                }
            }
        }
    ]);
