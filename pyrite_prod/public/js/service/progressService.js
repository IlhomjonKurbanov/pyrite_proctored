angular.module('pyrite')
    .constant("EXPERIMENT_STAGE", {
        'unstarted'    : 0,
        'demographics' : 1,
        'articles'     : 2,
        'finished'     : 3
    })
    .service('progressService', ['EXPERIMENT_STAGE', 'cookieService', function(EXPERIMENT_STAGE, cookieService) {
        //initialize progress data
        this.progress = cookieService.getProgress();
        if (this.progress == undefined) {
            this.progress = {
                stage : EXPERIMENT_STAGE.unstarted,
                articleIndex : 'demo' //start "fresh" pages on demo
            }
        }

        this.save = function() {
            cookieService.setProgress(this.progress);
        }

        this.setStage = function(stage) {
            this.progress.stage = EXPERIMENT_STAGE[stage];
            this.save();
        }

        this.setArticleIndex = function(index) {
            this.progress.articleIndex = index;
            this.save();
        }

        this.getArticleIndex = function() {
            return this.progress.articleIndex
        }

        this.getProgress = function() {
            return this.progress;
        }
    }]);
