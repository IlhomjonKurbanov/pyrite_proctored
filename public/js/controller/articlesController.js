// articlesController.js
// =====================
// controller for 'articles' view

angular.module('pyrite')
    .controller('articlesController', ['$scope', '$routeParams', '$location', 'appConfig',
                                       'cookieService', 'dbService', 'articleService',
                                       'Subject', 'ArticleResponse', 'SpontaneousResponse',
        function($scope, $routeParams, $location, appConfig,
                 cookieService, dbService, articleService,
                 Subject, ArticleResponse, SpontaneousResponse) {
            //check route against progress object
            $scope.index = $routeParams.index

            $scope.likertSelected = function() {
                return ($scope.likert != undefined);
            }

            $scope.submitResponse = function() {
                $location.path('/review');
                //$location.path('/articles/' + $scope.index);
            }
        }
    ]);
