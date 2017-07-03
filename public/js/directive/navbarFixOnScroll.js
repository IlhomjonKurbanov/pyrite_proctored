// navbarFixOnScroll.js
// ====================
// for use with generated articles in articles view
// ------------------------------------------------
// fixes element width and applies 'navbar-fixed' class when scroll reaches given offset
angular.module('pyrite')
    .directive('navbarFixOnScroll', function ($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.css('width', element.css('width'));
                var top = element.offset().top;
                angular.element($window).bind("scroll", function() {
                    if (!element.hasClass('navbar-fixed')) {
                        if (this.pageYOffset > top) {
                            element.addClass('navbar-fixed');
                        }
                    } else {
                        if (this.pageYOffset < top) {
                            element.removeClass('navbar-fixed');
                        }
                    }
                });
            }
        };
    })
