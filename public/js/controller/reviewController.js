// reviewController.js
// ===================
// controller for 'review' view

angular.module('pyrite')
    .controller('reviewController', ['$scope', '$rootScope', '$routeParams', '$location',
                                     '$window', '$document', '$timeout', '$document',
                                     'appConfig','progressService', 'cookieService', 'dbService',
        function($scope, $rootScope, $routeParams, $location, $window, $document, $timeout,
                 $anchorScroll, appConfig, progressService, cookieService, dbService) {
            //TODO update progress.index when submitting responses, make associated changes in appRoutes.js

            //display variables
            $scope.showLoadingMessage = true;
            $scope.showPrompt = false;
            $scope.showResponses = false;
            $scope.showNoResponsesMessage = false;
            $scope.disableNextButton = true;
            $scope.disableContinue = true;

            //article info
            $scope.articleOrder = ($rootScope.articleOrder != undefined) ?
                $rootScope.articleOrder : cookieService.getArticleOrder();
            $scope.articlePaths = new Array();
            $scope.articleOrder.forEach(function(val, index, array) {
                $scope.articlePaths.push('view/partial/articles/testArticle' + val + '.html');
            })

            //progress info
            $scope.trial = -1; //TODO use as index
            $scope.response = -1; //TODO use as index
            $scope.firstTrial = -1;
            $scope.current = {
                'trial' : {
                    'index' : -1,
                    'trials' : new Array()
                },
                'response' : {
                    'index' : -1,
                    'responses' : new Array()
                }
            }

            //page data
            $scope.responses;
            $scope.highlightStyles = {};
            $scope.modalStyles = {};
            $scope.articlePanelState = {};

            //get responses
            var responses_promise = dbService.getSpontaneousResponses({subjectID: cookieService.getSubjectID()});
            responses_promise.then(function(responses) {
                var rawResponses = responses;
                if (angular.equals({}, $scope.responses)) {
                    $scope.showLoadingMessage = false;
                    $scope.showNoResponsesMessage = true;
                } else {
                    $scope.responses = processRawResponses(rawResponses);
                    $scope.showLoadingMessage = false;
                    $scope.showPrompt = true;
                }
            });

            // == page function definitions ====================================
            // processes raw database response into responses grouped by article;
            // creates an object mirroring the structure of the processed responses,
            // used to apply styling to elements
            function processRawResponses(rawResponses) {
                var processed = {};
                var trialIndex = 0; //for storing current trial in  $scope.current.trial object
                var responseIndex = 0; //for storing current response in $scope.current.response object
                for (var key in rawResponses) {
                    if (!rawResponses.hasOwnProperty(key)) {
                        //The current property is not a direct property of p
                        continue;
                    }
                    var sr = rawResponses[key]; //get spontaneous response object
                    var processedSR = { //build procssed object
                        'SRID'      : sr.SRID,
                        'elementID' : sr.elementID,
                        'thumbsUp'  : sr.thumbsUp,
                    }

                    //to get review page working from initial state
                    if ($scope.response == -1) $scope.response = sr.SRID;

                    //add response to array of responses in $scope.current.response
                    $scope.current.response.responses.push(sr.SRID);

                    //if $scope.current.response.index isn't set yet, and this
                    //response is the 'current' response, set index; else,
                    //increment responseIndex;
                    if ($scope.current.response.index == -1) {
                        if (sr.SRID == $scope.response) {
                            $scope.current.response.index = responseIndex;
                        } else {
                            responseIndex++
                        }
                    }

                    if (!processed.hasOwnProperty(sr.trial)) {
                        //to get review page working form initial state
                        if ($scope.trial == -1) $scope.trial = sr.trial;

                        //if processed does not have an array for the current trial, create one
                        processed[sr.trial] = [processedSR];

                        //if working with a new trial, create new collections in style objects
                        $scope.highlightStyles[sr.trial] = {};
                        $scope.modalStyles[sr.trial] = {};

                        //if working with a new trial, create a new entry in articlePanelState:
                        //to begin, all article panels are closed, so no 'in' entry is added;
                        //set 'checked' to true if trial has been completed.
                        $scope.articlePanelState[sr.trial] = {};
                        $scope.articlePanelState[sr.trial]['collapse'] = '';
                        $scope.articlePanelState[sr.trial]['checked'] = ($scope.current.trial.index == -1 && sr.trial != $scope.trial);

                        //if trial is first in the list, record it as such
                        if ($scope.firstTrial == -1) $scope.firstTrial = sr.trial;

                        //if working with a new trial, add it to the array of trials
                        //in $scope.current.trial
                        $scope.current.trial.trials.push(sr.trial);

                        //if working with a new trial and $scope.current.trial.index
                        //isn't set yet, either increment trialIndex, or if the
                        //current trial == $scope.trial, set 'index' in
                        //$scope.current.trial to trialIndex
                        if ($scope.current.trial.index == -1) {
                            if (sr.trial == $scope.trial) {
                                $scope.current.trial.index = trialIndex;
                            } else {
                                trialIndex++
                            }
                        }
                    } else {
                        //else, push into existing array
                        processed[sr.trial].push(processedSR);
                    }

                    //create entries in styles arrays, mirroring structure of processed responses
                    $scope.highlightStyles[sr.trial][sr.SRID] = {
                        'display' : 'none'
                    }
                    $scope.modalStyles[sr.trial][sr.SRID] = {
                        'display' : 'none'
                    }
                }
                return processed;
            }

            function getElementRectangle(element) {
                //get element parameters
                var style = window.getComputedStyle(element);
                var margin = {
                    left: parseInt(style["margin-left"]),
                    top: parseInt(style["margin-top"]),
                };
                var border = {
                    right: parseInt(style["border-right"]),
                    top: parseInt(style["border-top"]),
                    bottom: parseInt(style["border-bottom"])
                };

                //get container parameters
                var responsePanel = document.querySelector('#response-panel');
                var panelRect = responsePanel.getBoundingClientRect();
                var panelStyle = window.getComputedStyle(responsePanel);
                panelBorder = {
                    left: parseInt(panelStyle["border-left"]),
                    top: parseInt(panelStyle["border-top"]),
                }

                //calculate "true" rectangle
                var rect = element.getBoundingClientRect();
                var calculatedRect = {
                    left: rect.left - panelRect.left - panelBorder.left - $window.pageXOffset,
                    right: rect.right - border.right - panelRect.left - panelBorder.left - $window.pageXOffset,
                    top: rect.top - panelRect.top - panelBorder.top - $window.pageYOffset,
                    bottom: rect.bottom - border.bottom - border.top - panelRect.top - panelBorder.top - $window.pageYOffset
                };
                calculatedRect.width = rect.right - rect.left;
                calculatedRect.height = rect.bottom - rect.top;
                return calculatedRect;
            }

            function setHighlightAndModalStyling(trial) {
                $scope.responses[trial].forEach(function(response, index, array) {
                    var rect = getElementRectangle(document.querySelector('#' + response.elementID));

                    //calculate position of highlight box:
                    //account for scroll with pageYOffset / pageXOffset
                    var top = rect.top + $window.pageYOffset; // + positionOffsetY;
                    var left = rect.left + $window.pageXOffset; // + positionOffsetX;
                    var bottom = rect.bottom + $window.pageYOffset;

                    //set position and dimensions of highlight box
                    var extendDimension = 10 //make the box bigger than the element it is highlighting
                    var offset = 5 //account for bigger box
                    $scope.highlightStyles[trial][response.SRID] = {
                        'top'     : top  - offset + "px",
                        'left'    : left  - offset + "px",
                        'width'   : rect.width + extendDimension + "px",
                        'height'  : rect.height + extendDimension + "px",
                    };

                    //set position of explanation modal
                    var modalWidth = 450;
                    $scope.modalStyles[trial][response.SRID] = {
                        'top'  : bottom + 20 + "px",
                        'left' : (left + (rect.width / 2)) - (modalWidth / 2) + "px"
                    }
                })
            }

            function getCurrentResponseOffset() {
                var trial = $scope.current.trial.trials[$scope.current.trial.index];
                var SRID = $scope.current.response.responses[$scope.current.response.index];
                return $scope.highlightStyles[trial][SRID].top.split('px')[0] - 60;
            }

            $scope.begin = function() {
                $scope.showPrompt = false;
                goToNextArticle(-1, $scope.current.trial.trials[$scope.current.trial.index]);
            }

            function goToNextArticle(currentTrial, nextTrial) {
                $scope.disableNextButton = true; //make sure 'next' button in next section is disabled

                if (currentTrial != -1) { //if goToNextArticle isn't being called from 'begin();'
                    $scope.articlePanelState[currentTrial].collapse = '';
                    $scope.articlePanelState[currentTrial].checked = true;
                    $scope.current.trial.index++;
                }
                //expand next trial
                $scope.articlePanelState[nextTrial].collapse = 'in';

                $timeout(function() {
                    setHighlightAndModalStyling(nextTrial);
                    $window.scrollTo(0, getCurrentResponseOffset());
                }, 25);
            }

            $scope.submitExplanation = function(trial, SRID, explanation, last) {
                //TODO Send to db

                $scope.current.response.index++
                if ($scope.current.response.index == $scope.current.response.responses.length) {
                    $scope.disableContinue = false;
                    $scope.articlePanelState[trial].collapse = '';
                    $scope.articlePanelState[trial].checked = true;
                } else {
                    if (last) goToNextArticle(trial, $scope.current.trial.trials[$scope.current.trial.index + 1]);
                    else $window.scrollTo(0, getCurrentResponseOffset());
                }
            }

            $scope.cancelResponse = function(SRID, last) {
                //TODO
            }

            $scope.continue = function() {
                progressService.setStage('finished');
                $location.path('/prize');
            }
    }]);
