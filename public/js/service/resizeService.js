angular.module('pyrite')
    .service('resizeService', function() {
        this.origin = '';
        this.setOrigin = function(origin) {
            this.origin = origin;
        }
        this.getOrigin = function() {
            return this.origin;
        }
        this.getIdealDimensions = function() {
            var ideal = {
                width : {
                    min : 1220,
                    max : 1920
                },
                height : {
                    min : 400,
                    max : 1000
                }
            }
            return ideal;
        }
    });
