// articlesController.js
// =====================
// controller for 'articles' view

angular.module('pyrite')
    .controller('articlesController', ['$scope', '$rootScope', '$routeParams', '$location',
                                       '$window', 'appConfig', 'likertValuesDB', 'cookieService',
                                       'dbService', 'articleService', 'progressService',
        function($scope, $rootScope, $routeParams, $location, $window, appConfig,
                 likertValuesDB, cookieService, dbService, articleService, progressService) {
            // == set up page info =============================================
            $scope.showSpontaneousResponse = false; //hide response modal initially
            $scope.index = parseInt($routeParams.index); //get article index from URL

            //fallback to cookieService handles $rootScope wipe on refresh
            $scope.articleOrder = ($rootScope.articleOrder != undefined) ?
                $rootScope.articleOrder : cookieService.getArticleOrder();
            $scope.articleID = $scope.articleOrder[$scope.index]; //get articleID
            $scope.articlePath = 'view/partial/articles/testArticle' + $scope.articleID + '.html';

            //response modal styles
            $scope.highlightStyle = {};
            $scope.responseStyle = {};

            //set counter variables
            $scope.pageTimeStart = Date.now(); //start response timer
            $scope.SRCount = 0; //set Spontaneous Response counter to 0
            $scope.thumbsUpCount = 0; //set "thumbs up" Spontaneous Response counter to 0

            //display parameters
            $scope.numArticles = articleService.getNumArticles();
            $scope.width = (50 / $scope.numArticles) * ($scope.index + 1)

            // == function definitions =========================================
            // ---- likert response functions ----------------------------------
            //validation that an option has been selected within the likert scale
            $scope.likertSelected = function() {
                return ($scope.likert != undefined);
            }

            //submit likert response to current article to DB, and transition to the next article
            $scope.submitArticleResponse = function() {
                var pageTimeEnd = Date.now(); //stop response timer
                $scope.index++; //advance to next trial

                //build article response
                var articleResponse =  {
                    subjectID: cookieService.getSubjectID(),
                    trial: $scope.index, //registered after increment because trials are 1-based rather than 0-based
                    articleID: $scope.articleID,
                    likert: likertValuesDB[$scope.likert], //transform text value into number for DB use
                    pageTime: pageTimeEnd - $scope.pageTimeStart, //time to respond, in ms
                    SRCount: $scope.SRCount, //number of spontaneous responses to this article
                    thumbsUpCount: $scope.thumbsUpCount //number of those responses which were "positive"
                }

                //store in database
                dbService.registerArticleResponse(articleResponse);

                //if articles remaining, continue; else, go to next stage of experiment
                if ($scope.index < articleService.getNumArticles()) {
                    progressService.setArticleIndex($scope.index);
                    $location.path('/articles/' + $scope.index);
                } else {
                    progressService.setStage('review');
                    progressService.setArticleIndex(0);
                    $location.path('/review');
                }
            }

            // ---- spontaneous response functions -----------------------------
            //set dimensions and position of highlight box based on bounding
            //rectangle of selected element
            $scope.setHighlightStyling = function(boundingRectangle) {
                //calculate size of highlight box:
                //extend box to be "outside" of element borders
                var extendDimension = 11; //experimentally determined
                var width = boundingRectangle.right - boundingRectangle.left + extendDimension;
                var height = boundingRectangle.bottom - boundingRectangle.top + extendDimension;

                //calculate position of highlight box:
                //account for scroll with pageYOffset / pageXOffset
                var positionOffset = -25; //experimentally determined
                var top = boundingRectangle.top + $window.pageYOffset + positionOffset;
                var left = boundingRectangle.left + $window.pageXOffset + positionOffset;

                //set position and dimensions of highlight box
                $scope.highlightStyle = {
                    'top'    : top + "px",
                    'left'   : left + "px",
                    'width'  : width + "px",
                    'height' : height + "px"
                };
            }

            //set position of response callout based on bounding rectange of
            //selected element
            $scope.setResponseStyling = function(boundingRectangle) {
                //set position of response callout:
                //account for scroll with pageYOffset / pageXOffset
                var topOffset = -35; //experimentally determined
                var leftOffset = -15; //experimentally determined
                $scope.responseStyle= {
                    'top'  : boundingRectangle.top + $window.pageYOffset + topOffset + "px",
                    'left' : boundingRectangle.right + $window.pageXOffset + leftOffset + "px",
                };
            }

            //handle UI changes when user selects an article element
            $scope.selectElement = function(event) {
                //get bounding rectange of selected element
                var selected = document.elementFromPoint(event.pageX - $window.pageXOffset,
                                                         event.pageY - $window.pageYOffset);
                var rect = selected.getBoundingClientRect(); //for UI dimensions/position

                //for storage in database
                $scope.selectedID = selected.id;

                //set dimensions and position of highlight box
                $scope.setHighlightStyling(rect);

                //set position of response callout
                $scope.setResponseStyling(rect);

                //now that they are configured, show highlight box and
                //response callout
                $scope.showSpontaneousResponse = true;
            }

            //hide spontaneous response
            $scope.hideSpontaneousResponse = function() {
                $scope.showSpontaneousResponse = false;
            }

            //submit a "spontaneous response" to an article element
            $scope.submitSpontaneousResponse = function(event) {
                var isThumbsUp = event.target.id == "positive";

                //increment counters
                $scope.SRCount++;
                if (isThumbsUp) $scope.thumbsUpCount++;

                //construct spontaneousResponse object
                var spontaneousResponse = {
                    subjectID: cookieService.getSubjectID(),
                    trial: $scope.index + 1, // + 1 because trials are 1-based instead of 0 based
                    articleID: $scope.articleID,
                    elementID: $scope.selectedID,
                    thumbsUp: (isThumbsUp) ? 1 : 0 //1 = true, 0 = false
                }

                //store in database
                dbService.registerSpontaneousResponse(spontaneousResponse);

                //hide spontaneous response UI
                $scope.hideSpontaneousResponse();
            }
        }
    ]);
