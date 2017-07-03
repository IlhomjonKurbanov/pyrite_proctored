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
            $scope.responseTitleStyles = {
                'more-believable' : { 'color' : '#498a44' },
                'less-believable' : { 'color' : '#c92d39' },
            }

            //article info
            $scope.articlePaths = ($rootScope.articleOrder != undefined) ?
                $rootScope.articleOrder : cookieService.getArticleOrder();


            //progress info
            $scope.current = {
                'trial' : {
                    'index' : 0,
                    'trials' : new Array()
                },
                'response' : {
                    'index' : 0,
                    'responses' : new Array()
                }
            }
            if (appConfig.DO_PROGRESS_CHECK) {
                var reviewIndex = progressService.getReviewIndex();
                $scope.current.trial.index = reviewIndex.trial;
                $scope.current.response.index = reviewIndex.response;
            }

            //page data
            $scope.responses;
            $scope.highlightStyles = {};
            $scope.modalStyles = {};
            $scope.articlePanelState = {};

            //get responses
            var responses_promise = dbService.getSpontaneousResponses({subjectID: cookieService.getSubjectID()});
            responses_promise.then(function(responses) {
                if (angular.equals({}, responses)) {
                    $scope.showLoadingMessage = false;
                    $scope.showNoResponsesMessage = true;
                    $scope.disableContinue = false;
                } else {
                    $scope.responses = processRawResponses(responses);
                    buildPageData(responses);
                    $scope.showLoadingMessage = false;
                    $scope.showPrompt = true;
                    $scope.showResponses = true;
                }
            });

            // == page function definitions ====================================

            // processes raw database response into responses grouped by trial/article
            function processRawResponses(rawResponses) {
                var processed = {};
                for (var key in rawResponses) {
                    if (!rawResponses.hasOwnProperty(key)) {
                        //The current property is not a direct property of rawResponses
                        continue;
                    }

                    var sr = rawResponses[key]; //get spontaneous response object
                    var processedSR = { //build procssed object
                        'SRID'           : sr.SRID,
                        'elementID'      : sr.elementID,
                        'moreBelievable' : sr.moreBelievable,
                    }

                    if (!processed.hasOwnProperty(sr.trial)) {
                        //if processed does not have an array for the current trial, create one
                        processed[sr.trial] = [processedSR];
                    } else {
                        //if processed contains array for current trial, push into existing array
                        processed[sr.trial].push(processedSR);
                    }
                }
                return processed;
            }

            //use the raw responses object and the same collection creation/update
            //logic as processRawResponses(), builds all necessary page data for
            //tracking the current trial and response, as well as displaying various
            //associated UI elements correctly
            function buildPageData(rawResponses) {
                var tracking = {} //for tracking when a trial is 'first' accessed
                var trialIndex = 0; //for setting 'checked' states in articlePanelState
                for (var key in rawResponses) {
                    if (!rawResponses.hasOwnProperty(key)) {
                        //The current property is not a direct property of rawResponses
                        continue;
                    }
                    var sr = rawResponses[key]; //get spontaneous response object

                    //add response to array of responses in $scope.current.response
                    $scope.current.response.responses.push(sr.SRID);

                    if (!tracking.hasOwnProperty(sr.trial)) {
                        //if tracking object does not have an array for the current trial, create one
                        tracking[sr.trial] = [sr.SRID];

                        //if working with a new trial, create new collections in style objects
                        $scope.highlightStyles[sr.trial] = {};
                        $scope.modalStyles[sr.trial] = {};

                        //if working with a new trial, create a new entry in articlePanelState:
                        //to begin, all article panels are closed, so no 'in' entry is added;
                        //set 'checked' to true if trial has been completed.
                        $scope.articlePanelState[sr.trial] = {};
                        $scope.articlePanelState[sr.trial]['collapse'] = '';
                        $scope.articlePanelState[sr.trial]['checked'] = (trialIndex < $scope.current.trial.index);
                        trialIndex++;

                        //if working with a new trial, add it to the array of trials
                        //in $scope.current.trial
                        $scope.current.trial.trials.push(sr.trial);
                    } else {
                        //else, push into existing array
                        tracking[sr.trial].push(sr.SRID);
                    }

                    //create entries in styles arrays, mirroring structure of processed responses
                    $scope.highlightStyles[sr.trial][sr.SRID] = {
                        'display' : 'none'
                    }
                    $scope.modalStyles[sr.trial][sr.SRID] = {
                        'display' : 'none'
                    }
                }
            }

            //intelligently get the the desired 'element rectangle' parameters,
            //for a given element. Accounts for borders/margins where necessary
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

            //uses an element's position and dimensions to correctly set the
            //styling for a given response's highlight element and response modal
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
                    var modalWidth = 550;
                    $scope.modalStyles[trial][response.SRID] = {
                        'top'  : bottom + 20 + "px",
                        'left' : (left + (rect.width / 2)) - (modalWidth / 2) + "px"
                    }
                })
            }

            //get the vertical offset of a given response, to scroll the page to
            function getCurrentResponseOffset() {
                var trial = $scope.current.trial.trials[$scope.current.trial.index];
                var SRID = $scope.current.response.responses[$scope.current.response.index];
                return $scope.highlightStyles[trial][SRID].top.split('px')[0] - 60;
            }

            //go to the next trial/article: controls UI
            function goToNextArticle(currentTrial, nextTrial) {
                $scope.disableNextButton = true; //make sure 'next' button in next section is disabled

                if (currentTrial != -1) { //if goToNextArticle isn't being called from 'begin();'
                    $scope.articlePanelState[currentTrial].collapse = '';
                    $scope.articlePanelState[currentTrial].checked = true;
                    $scope.current.trial.index++;
                    progressService.setReviewIndex('trial', $scope.current.trial.index);
                }
                //expand next trial
                $scope.articlePanelState[nextTrial].collapse = 'in';

                $timeout(function() {
                    setHighlightAndModalStyling(nextTrial);
                    $window.scrollTo(0, getCurrentResponseOffset());
                }, 25);
            }

            //go to the first trial/article
            $scope.begin = function() {
                $scope.showPrompt = false;
                goToNextArticle(-1, $scope.current.trial.trials[$scope.current.trial.index]);
            }

            //send response explanation, 'narrative response', to the database
            function submitNarrativeResponse(SRID, response) {
                var narrativeResponse = {
                    SRID: SRID,
                    response: response
                }

                dbService.registerNarrativeResponse(narrativeResponse);
            }

            function moveToNextResponse(trial, SRID, last) {
                //hide current highlight and response modal
                $scope.highlightStyles[trial][SRID] = { 'display' : 'none' }; //if this is removed, put it in cancelResponse
                $scope.current.response.index++

                //save progress
                progressService.setReviewIndex('response', $scope.current.response.index);

                //handle special cases (last response overall / last response for given article)
                if ($scope.current.response.index == $scope.current.response.responses.length) {
                    $scope.disableContinue = false;
                    $scope.articlePanelState[trial].collapse = '';
                    $scope.articlePanelState[trial].checked = true;
                    progressService.setStage('finished');
                } else {
                    if (last) goToNextArticle(trial, $scope.current.trial.trials[$scope.current.trial.index + 1]);
                    else $window.scrollTo(0, getCurrentResponseOffset());
                }
            }

            //submit the explanation for a given response
            $scope.submitExplanation = function(trial, SRID, explanation, last) {
                moveToNextResponse(trial, SRID, last);
                submitNarrativeResponse(SRID, explanation);
            }

            //delete a response
            $scope.deleteResponse = function(trial, SRID, last) {
                moveToNextResponse(trial, SRID, last);
                dbService.deleteSpontaneousResponse({ SRID: SRID });
            }

            //continue to the prize page
            $scope.continue = function() {
                $location.path('/prize');
            }
    }]);
