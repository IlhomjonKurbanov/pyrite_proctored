// articlesController.js
// =====================
// controller for 'articles' view

angular.module('pyrite')
    .controller('articlesController', ['$scope', '$rootScope', '$routeParams', '$location', 'appConfig', 'likertValuesDB',
                                       'cookieService', 'dbService', 'articleService', 'progressService',
        function($scope, $rootScope, $routeParams, $location, appConfig,
                 likertValuesDB, cookieService, dbService, articleService, progressService) {
            // == set up page info =============================================
            $scope.showResponseModal = false; //hide response modal initially
            $scope.index = parseInt($routeParams.index);
            //fallback to cookieService handles $rootScope wipe on refresh
            $scope.articleOrder = ($rootScope.articleOrder != undefined) ?
                $rootScope.articleOrder : cookieService.getArticleOrder();
            $scope.articleID = $scope.articleOrder[$scope.index];

            //set counter variables
            $scope.pageTimeStart = Date.now(); //start response timer
            $scope.SRCount = 0; //set Spontaneous Response counter to 0
            $scope.thumbsUpCount = 0; //set "thumbs up" Spontaneous Response counter to 0

            //display parameters
            $scope.numArticles = articleService.getNumArticles();
            $scope.width = (50 / $scope.numArticles) * ($scope.index + 1)

            // == function definitions =========================================
            $scope.likertSelected = function() {
                return ($scope.likert != undefined);
            }

            $scope.submitArticleResponse = function() {
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

                if ($scope.index < articleService.getNumArticles()) {
                    progressService.setIndex($scope.index);
                    $location.path('/articles/' + $scope.index);
                } else {
                    progressService.setStage('review');
                    progressService.setIndex(0);
                    $location.path('/review');
                }
            }

            $scope.submitSpontaneousResponse = function(thumbsUp) {
                $scope.SRCount++;
                if (thumbsUp) $scope.thumbsUpCount++;
                //TODO submit response to database
            }
        }
    ]);
