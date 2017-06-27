// appRoutes.js
// ============
// front-end routing, defines controllers & templates for views

angular.module('pyrite')
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            // start page
            .when('/', {
                templateUrl: 'view/start.html',
                controller: 'startController'
            })

            // instructions page
            .when('/instructions', {
                templateUrl: 'view/instructions.html',
                controller: 'instructionsController'
            })

            // consent page
            .when('/consent', {
                templateUrl: 'view/consent.html',
                controller: 'consentController'
            })

            // demographic page
            .when('/demographics', {
                templateUrl: 'view/demographics.html',
                controller: 'demographicsController'
            })

            // articles page
            .when('/articles/:index', {
                templateUrl: 'view/articles.html',
                controller: 'articlesController'
            })

            // review spontaneous responses page
            .when('/review', {
                templateUrl: 'view/review.html',
                controller: 'reviewController'
            })

            // prize drawing page
            .when('/prize', {
                templateUrl: 'view/prize.html',
                controller: 'prizeController'
            })

            // end page
            .when('/end', {
                templateUrl: 'view/end.html'
            })

            .when('/404', {
                templateUrl: 'view/404.html'
            })

            // blur utility
            .when('/blur', {
                templateUrl: 'view/blur.html',
                controller: 'blurController'
            })

            //otherwise redirect to page not found error
            .otherwise('/404');
    });
//handles routing behavior: scroll to top on route change, and subject consent validation
angular.module('pyrite')
    .run(['$rootScope', '$window', '$location', 'appConfig', 'cookieService', 'progressService', 'EXPERIMENT_STAGE',
        function($rootScope, $window, $location, appConfig, cookieService, progressService, EXPERIMENT_STAGE) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if ($location.path() == '/blur' && !appConfig.BLUR_TOOL_AVAILABLE) {
                    $location.path('/404');
                }
                if (appConfig.DO_PROGRESS_CHECK) {
                    var progress = progressService.getProgress();
                    var stage = progress.stage;
                    var path = $location.path();
                    switch (stage) {
                        case EXPERIMENT_STAGE.unstarted:
                            if (path != '/' && path != '/consent') $location.path('/');
                            break;
                        case EXPERIMENT_STAGE.introduction:
                            if (path != '/introduction') $location.path('/introduction');
                            break;
                        case EXPERIMENT_STAGE.articles:
                            if (!path.includes('/articles') || next.params.index != progress.articleIndex) {
                                $location.path('/articles/' + progress.articleIndex);
                            }
                            break;
                        case EXPERIMENT_STAGE.review:
                            if (path != '/review') $location.path('/review');
                            break;
                        case EXPERIMENT_STAGE.finished:
                            if (path != '/prize' && path != '/end') $location.path('/end');
                            break;
                    }
                }
                $window.scrollTo(0 ,0);
            });
        }]);
