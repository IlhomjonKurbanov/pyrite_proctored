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

            // prize drawing page
            .when('/prize', {
                templateUrl: 'view/prize.html',
                controller: 'prizeController'
            })

            // end page
            .when('/end', {
                templateUrl: 'view/end.html'
            })

            // window size warning
            .when('/resize', {
                templateUrl: 'view/resize.html',
                controller: 'resizeController'
            })

            .when('/404', {
                templateUrl: 'view/404.html'
            })

            //otherwise redirect to page not found error
            .otherwise('/404');
    });
//handles routing behavior: scroll to top on route change, and subject consent validation
angular.module('pyrite')
    .run(['$rootScope', '$window', '$location', 'appConfig', 'windowSizeMinimums', 'cookieService', 'progressService', 'EXPERIMENT_STAGE',
        function($rootScope, $window, $location, appConfig, windowSizeMinimums, cookieService, progressService, EXPERIMENT_STAGE) {
            $rootScope.$on("$routeChangeStart", function (event, next, pr) {
                if (appConfig.DO_WINDOW_SIZE_CHECK && !$location.path().includes('/resize')) {
                    var minimum = windowSizeMinimums;
                    var width = $window.innerWidth;
                    var height = $window.innerHeight;
                    if (width < minimum.width || height < minimum.height) {
                        cookieService.setOrigin($location.path());
                        $location.path('/resize');
                    }
                }
                if (appConfig.DO_PROGRESS_CHECK && !$location.path().includes('/resize')) {
                    var progress = progressService.getProgress();
                    var stage = progress.stage;
                    var path = $location.path();
                    switch (stage) {
                        case EXPERIMENT_STAGE.unstarted:
                            if (path != '/' && path != '/consent') $location.path('/');
                            break;
                        case EXPERIMENT_STAGE.demographics:
                            if (path != '/demographics') $location.path('/demographics');
                            break;
                        case EXPERIMENT_STAGE.articles:
                            if (!path.includes('/articles') || next.params.index != progress.articleIndex) {
                                $location.path('/articles/' + progress.articleIndex);
                            }
                            break;
                        case EXPERIMENT_STAGE.finished:
                            if (path != '/prize' && path != '/end') $location.path('/end');
                            break;
                    }
                }
                $window.scrollTo(0 ,0);
            });
        }]);
