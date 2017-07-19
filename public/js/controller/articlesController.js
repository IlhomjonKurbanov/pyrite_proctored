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
            $scope.showNarrativeResponse = false; //hide narrative response modal initially

            // demo section, initiates major page variables
            doDemoLogic();

            // check if demo
            $scope.demo = ($routeParams.index == 'demo');

            if ($scope.demo) { //begin demo
                setTimeout(function () {
                    $scope.demoStep = 1;
                    $("#step-1").modal("show");
                }, 100);
                $scope.articlePath = 'view/partial/demo.html';
                doDemoLogic();
            } else { //begin article
                $scope.index = parseInt($routeParams.index); //get article index from URL

                //clean up from modals
                angular.element('.modal-backdrop').css('display', 'none');
                angular.element('body').removeClass('modal-open');

                //fallback to cookieService handles $rootScope wipe on refresh
                $scope.articleOrder = $rootScope.articleOrder || cookieService.getArticleOrder();
                $scope.articlePath = $scope.articleOrder[$scope.index]; //get articlePath
                $scope.articleID = $scope.articlePath.split('_')[1].split('.')[0];
            }

            //response modal styles
            $scope.highlightStyle = {};
            $scope.spontaneousResponseStyle = {};
            $scope.narrativeResponseStyle = {};

            //set counter variables
            $scope.pageTimeStart = Date.now(); //start response timer
            $scope.SRCount = 0; //set Spontaneous Response counter to 0
            $scope.moreBelievableCount = 0; //set "more believable" Spontaneous Response counter to 0

            //display parameters
            $scope.numTrials = articleService.getNumTrials();
            $scope.width = ($scope.demo) ? 0 : (75 / $scope.numTrials) * ($scope.index + 1);
            $scope.moreBelievable = true;

            // == function definitions =========================================
            // ---- all custom demo logic --------------------------------------
            function doDemoLogic() {
                var likertHighlightTriggered = false;
                setTimeout(function () {
                    var top1 = document.querySelector("#image_demo1_1").getBoundingClientRect().top;
                    var top2 = document.querySelector("#paragraph_demo1_3").getBoundingClientRect().top;
                    var topForArrow = document.querySelector("#paragraph_demo1_2").getBoundingClientRect().top;
                    var bottom = document.querySelector(".container").clientHeight - 130;

                    angular.element($window).bind("scroll", function() {
                        if ($scope.demoStep == 1 && this.pageYOffset > top1) {
                            $scope.demoStep = 2;
                            $("#step-2").modal("show");
                        }
                        if ($scope.demoStep == 2 && this.pageYOffset > top2) {
                            $scope.demoStep = 'arrow';
                            document.querySelector("#hint").setAttribute('style', 'opacity:1;right:50px;');
                        }
                        if ($scope.demoStep == 'arrow' && this.pageYOffset + $window.innerHeight >= bottom) {
                            $scope.demoStep = 3;
                            $("#step-3").modal("show");
                            angular.element(document.querySelector('#likert')).addClass('highlight-border');
                        }
                    });
                }, 500);
            }

            $scope.endDemo = function() {
                angular.element($window).unbind("scroll");
                progressService.setArticleIndex(0);
                $location.path('/articles/0');
            }

            // ---- likert response functions ----------------------------------
            //validation that an option has been selected within the likert scale
            $scope.likertSelected = function() {
                return ($scope.likert != undefined);
            }

            //submit likert response to current article to DB, and transition to the next article
            $scope.submitArticleResponse = function() {
                if ($scope.demo) {
                    $scope.endDemo();
                    return;
                }

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
                    moreBelievableCount: $scope.moreBelievableCount //number of those responses which were "more believable"
                }

                //store in database
                dbService.registerArticleResponse(articleResponse);

                //if articles remaining, continue; else, go to next stage of experiment
                if ($scope.index < $scope.numTrials) {
                    progressService.setArticleIndex($scope.index);
                    $location.path('/articles/' + $scope.index);
                } else {
                    progressService.setStage('finished');
                    progressService.setArticleIndex(0);
                    $location.path('/prize');
                }
            }

            // ---- spontaneous response functions -----------------------------
            //set dimensions and position of highlight box based on bounding
            //rectangle of selected element
            $scope.setHighlightStyling = function(boundingRectangle) {
                //calculate size of highlight box:
                //extend box to be "outside" of element borders
                var extendDimension = 10; //experimentally determined
                var width = boundingRectangle.right - boundingRectangle.left + extendDimension;
                var height = boundingRectangle.bottom - boundingRectangle.top + extendDimension;

                //calculate position of highlight box:
                //account for scroll with pageYOffset / pageXOffset
                var positionOffset = -25; //experimentally determined
                var top = boundingRectangle.top + $window.pageYOffset + positionOffset;
                var left = boundingRectangle.left + $window.pageXOffset + positionOffset;

                //images have -25px margins
                if ($scope.selectedID.indexOf('image_') > -1) {
                    top += 25;
                    left += 25;
                    width -= 50;
                    height -= 50;
                }

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
            $scope.setSpontaneousResponseStyling = function(boundingRectangle) {
                var elementWidth = boundingRectangle.right - boundingRectangle.left;
                var modalWidth = 316;

                //set position of response callout:
                //account for scroll with pageYOffset / pageXOffset
                var topOffset = -3; //experimentally determined
                if ($scope.selectedID.indexOf('image_') > -1) topOffset -= 25; //images have -25px margins
                var leftOffset = -19; //experimentally determined
                $scope.spontaneousResponseStyle= {
                    'top'  : boundingRectangle.bottom + $window.pageYOffset + topOffset + "px",
                    'left' : boundingRectangle.left + $window.pageXOffset + (elementWidth / 2) - (modalWidth / 2) + leftOffset + "px",
                };
            }

            //set position of response callout based on bounding rectange of
            //selected element
            $scope.setNarrativeResponseStyling = function(boundingRectangle) {
                var elementWidth = boundingRectangle.right - boundingRectangle.left;
                var modalWidth = 550;

                //set position of narrative response callout:
                //account for scroll with pageYOffset / pageXOffset
                var topOffset = 1; //experimentally determined
                if ($scope.selectedID.indexOf('image_') > -1) topOffset -= 25; //images have -25px margins;
                var leftOffset = -19; //experimentally determined
                $scope.narrativeResponseStyle = {
                    'top'  : boundingRectangle.bottom + $window.pageYOffset + topOffset + "px",
                    'left' : boundingRectangle.left + $window.pageXOffset + (elementWidth / 2) - (modalWidth / 2) + leftOffset + "px",
                };
            }

            //handle UI changes when user selects an article element
            $scope.selectElement = function(event) {
                //ignore if in demo1
                if ($scope.demo) {
                    $scope.hideSpontaneousResponse();
                    return;
                }

                //get bounding rectange of selected element
                var selected = document.elementFromPoint(event.pageX - $window.pageXOffset,
                                                         event.pageY - $window.pageYOffset);
                var rect = selected.getBoundingClientRect(); //for UI dimensions/position

                //for storage in database
                $scope.selectedID = selected.id;

                //set dimensions and position of highlight box
                $scope.setHighlightStyling(rect);

                //set position of response callout
                $scope.setSpontaneousResponseStyling(rect);

                //set position of narrative response callout
                $scope.setNarrativeResponseStyling(rect);

                //now that they are configured, show highlight box and
                //response callout
                $scope.showSpontaneousResponse = true;
            }

            //hide spontaneous response
            $scope.hideSpontaneousResponse = function() {
                $scope.showNarrativeResponse = false;
                $scope.showSpontaneousResponse = false;
                $scope.response = undefined;
            }

            //submit a "spontaneous response" to an article element
            $scope.submitSpontaneousResponse = function(val) {
                //increment counters
                $scope.SRCount++;
                if (val == 'more-believable') {
                    $scope.moreBelievableCount++;
                    $scope.moreBelievable = true;
                } else {
                    $scope.moreBelievable = false;
                }

                //skip from here, because moreBelievable needs to be set
                if ($scope.demo) {
                    $scope.showNarrativeResponse = true;
                    return; //neuter if in demo
                }

                //construct spontaneousResponse object
                var spontaneousResponse = {
                    subjectID: cookieService.getSubjectID(),
                    trial: $scope.index + 1, // + 1 because trials are 1-based instead of 0 based
                    articleID: $scope.articleID,
                    elementID: $scope.selectedID,
                    moreBelievable: (val == 'more-believable') ? 1 : 0 //1 = true, 0 = false
                }

                //store in database
                var SRID_promise = dbService.registerSpontaneousResponse(spontaneousResponse);
                SRID_promise.then(function(SRID) {
                    $scope.currentSRID = SRID;
                });
                $scope.showNarrativeResponse = true;
            }

            $scope.submitNarrativeResponse = function(response) {
                if ($scope.demo) {
                    $scope.hideSpontaneousResponse();
                    return; //neuter if in demo
                }

                if (response == undefined) {
                    $scope.hideSpontaneousResponse();
                    return;
                }

                var narrativeResponse = {
                    SRID: $scope.currentSRID,
                    response: response
                }
                dbService.registerNarrativeResponse(narrativeResponse);

                $scope.hideSpontaneousResponse();
            }

            $scope.cancelResponse = function() {
                $scope.hideSpontaneousResponse();
                dbService.deleteSpontaneousResponse({SRID: $scope.currentSRID});
            }
        }
    ]);
