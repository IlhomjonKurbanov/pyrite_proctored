angular.module('pyrite')
    .constant("EXPERIMENT_STAGE", {
        'unstarted'    : 0,
        'demographics' : 1,
        'articles'     : 2,
        'review'       : 3,
        'finished'     : 4
    })
    .service('progressService', ['EXPERIMENT_STAGE', 'cookieService', function(EXPERIMENT_STAGE, cookieService) {
        //initialize progress data
        this.progress = cookieService.getProgress();
        if (this.progress == undefined) {
            this.progress = {
                stage : EXPERIMENT_STAGE.unstarted,
                articleIndex : 'demo1', //start "fresh" pages on first article
                reviewIndex : { //start "fresh" pages on first trial and response
                    trial: 0,
                    response: 0
                }
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

        this.setReviewIndex = function(type, index) {
            if (type == 'trial') this.progress.reviewIndex.trial = index;
            if (type == 'response') this.progress.reviewIndex.response = index;
            this.save();
        }

        this.getReviewIndex = function() {
            return this.progress.reviewIndex;
        }

        this.getProgress = function() {
            return this.progress;
        }
    }]);
