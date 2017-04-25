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

            //set counter variables
            $scope.pageTimeStart = Date.now(); //start response timer
            $scope.SRCount = 0; //set Spontaneous Response counter to 0
            $scope.thumbsUpCount = 0; //set "thumbs up" Spontaneous Response counter to 0

            $scope.likertSelected = function() {
                return ($scope.likert != undefined);
            }

            $scope.submitArticleResponse = function() {
                //TODO update progress service
                var pageTimeEnd = Date.now();
                $scope.index++;
                var articleResponse =  {
                    subjectID: cookieService.getSubjectID(),
                    trial: $scope.index, //registered after increment because trials are 1-based rather than 0-based
                    articleID: $scope.articleID,
                    likert: likertValuesDB[$scope.likert], //transform readable value into number for DB use
                    pageTime: pageTimeEnd - $scope.pageTimeStart,
                    SRCount: $scope.SRCount,
                    thumbsUpCount: $scope.thumbsUpCount
                }
                dbService.registerArticleResponse(articleResponse);

                var path = ($scope.index < articleService.getNumArticles()) ?
                    '/articles/' + $scope.index : '/review';
                $location.path(path);
            }

            $scope.submitSpontaneousResponse = function(thumbsUp) {
                $scope.SRCount++;
                if (thumbsUp) $scope.thumbsUpCount++;
                //submit response to database
            }
        }
    ]);
