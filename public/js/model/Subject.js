// Subject.js
// ==========
// subject model, containing the subjectID, age, major, conent information, and progress information

angular.module('pyrite')
    .factory('Subject', ['EXPERIMENT_STAGE', function(EXPERIMENT_STAGE) {
        //constructor
        function Subject(age, major, dateConsented) {
            this.subjectID     = -1; //defined by database on first write, will be updated right after
            this.age           = age;
            this.major         = major;
            this.dateConsented = dateConsented; //set upon submitting consent
            this.articleOrder  = new Array();
            this.progress      = { "stage" : EXPERIMENT_STAGE.unstarted, "index" : -1 }
        }

        //based on databse-provided unique ID, so must be set after construction
        Subject.prototype.setSubjectID = function(subjectID) {
            this.subjectID = subjectID;
        }

        //date formatted as YYYY-MM-DD
        Subject.prototype.submitConsent = function(date) {
            this.dateConsented = date;
        }

        //advance subject to articles stage
        Subject.prototype.advanceToArticles = function() {
            this.progress.stage = EXPERIMENT_STAGE.articles;
            this.progress.index = 0;
        }

        //advance subject to spontaneous response review stage
        Subject.prototype.advanceToReview = function() {
            this.progress.stage = EXPERIMENT_STAGE.review;
            this.progress.index = 0;
        }

        //advance subject to 'finished' stage
        Subject.prototype.finish = function() {
            this.progress.stage = EXPERIMENT_STAGE.finished;
            this.progress.index = -1;
        }

        //advance index (within articles or review stage)
        Subject.prototype.advanceIndex = function() {
            this.progress.index++;
        }

        return Subject;
    }]);
