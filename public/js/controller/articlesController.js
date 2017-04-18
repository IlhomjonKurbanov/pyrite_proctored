// articlesController.js
// =====================
// controller for 'articles' view

angular.module('pyrite')
    .controller('articlesController', ['$scope', '$routeParams', 'appConfig', 'articlesConfig',
                                       'cookieService', 'dbService', 'articleService',
                                       'Subject', 'ArticleResponse', 'SpontaneousResponse',
        function($scope, $routeParams, appConfig, articlesConfig,
                 cookieService, dbService, articleService,
                 Subject, ArticleResponse, SpontaneousResponse) {
            //check route against progress object
            $scope.index = $routeParams.index

            $scope.likertSelected = function() {
                return ($scope.likert != undefined);
            }

            $scope.submitResponse = function() {
                //$location.path('/articles/' + $scope.index);
            }
        }
    ]);
