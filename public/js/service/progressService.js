angular.module('pyrite')
    .constant("EXPERIMENT_STAGE", {
        "unstarted" : 0,
        "articles"  : 1,
        "review"    : 2,
        "finished"  : 3
    })
    .service('progressService', ['EXPERIMENT_STAGE', function(EXPERIMENT_STAGE) {
        this.stage = EXPERIMENT_STAGE.unstarted;
        this.index = -1; //'null' index for unstarted stage

        this.setStage = function(stage) {
            this.stage = stage;
        }

        this.getStage = function() {
            return this.stage;
        }

        this.setIndex = function(index) {
            this.index = index;
        }

        this.getIndex = function(index) {
            return this.index;
        }
    }]);
