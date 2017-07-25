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

            // check if demo
            $scope.demo = ($routeParams.index == 'demo');

            // either begin demo or set up for normal article
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

            //set page time variable
            $scope.pageTimeStart = Date.now(); //start response timer

            //display parameters
            $scope.numTrials = articleService.getNumTrials();
            $scope.width = ($scope.demo) ? 0 : (75 / $scope.numTrials) * ($scope.index + 1);

            // == function definitions =========================================
            // ---- all custom demo logic --------------------------------------
            function doDemoLogic() {
                var likertHighlightTriggered = false;
                setTimeout(function () {
                    var top1 = document.querySelector("#image_demo_1").getBoundingClientRect().top;
                    var top2 = document.querySelector("#paragraph_demo_3").getBoundingClientRect().top;
                    var topForArrow = document.querySelector("#paragraph_demo_2").getBoundingClientRect().top;
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
                    $location.path('/end');
                }
            }
        }
    ]);
