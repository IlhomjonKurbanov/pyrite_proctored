// articlesController.js
// =====================
// controller for 'articles' view

angular.module('pyrite')
    .controller('articlesController', ['$scope', '$rootScope', '$routeParams', '$location', 'appConfig',
                                       'likertValuesDB', 'cookieService', 'dbService', 'articleService',
        function($scope, $rootScope, $routeParams, $location, appConfig,
                 likertValuesDB, cookieService, dbService, articleService) {
            //TODO check route against progress object
            $scope.index = $routeParams.index
            //fallback to cookieService handles $rootScope wipe on refresh
            $scope.articleOrder = ($rootScope.articleOrder != undefined) ?
                $rootScope.articleOrder : cookieService.getArticleOrder();
            $scope.articleID = $scope.articleOrder[$scope.index];

            $scope.likertSelected = function() {
                return ($scope.likert != undefined);
            }

            $scope.submitResponse = function() {
                //TODO update progress service
                $scope.index++;
                var articleResponse =  {
                    subjectID: cookieService.getSubjectID(),
                    trial: $scope.index, //registered after increment because trials are 1-based rather than 0-based
                    articleID: $scope.articleID,
                    likert: likertValuesDB[$scope.likert] //transform readable value into number for DB use
                }
                dbService.registerArticleResponse(articleResponse);

                var path = ($scope.index < articleService.getNumArticles()) ?
                    '/articles/' + $scope.index : '/review';
                $location.path(path);
            }
        }
    ]);
