angular.module('pyrite')
    .constant("EXPERIMENT_STAGE", {
        "unstarted"    : 0,
        "introduction" : 1,
        "articles"     : 2,
        "review"       : 3,
        "finished"     : 4
    })
    .service('progressService', ['EXPERIMENT_STAGE', 'cookieService', function(EXPERIMENT_STAGE, cookieService) {
        //TODO
        //TODO retrieve progress from cookieService, then add redirect logic based on same data in appRoutes.js
        //TODO
        this.progress = cookieService.getProgress();
        if (this.progress == undefined) {
            this.progress = {
                stage : EXPERIMENT_STAGE.unstarted,
                index : -1 //'null' index for unstarted stage
            }
        }

        this.setStage = function(stage) {
            this.progress.stage = EXPERIMENT_STAGE[stage];
        }

        this.setIndex = function(index) {
            this.progress.index = index;
        }

        this.getProgress = function() {
            return this.progress;
        }
    }]);
