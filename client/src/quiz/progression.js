"use strict";

/**
 * 
 * Progression
 * 
 * Given an array of question objects, provides functionality
 * to iterate through the quiz questions, and tries to be smart
 * about which questions to repeat.
 *
 */

var Progression = function() {

    this.Sequence = function(array, unlockN) {

        this.ind = array.length-1;
        this.current = array[array.length-1];
        this.items = array;
        this.unlockN = typeof unlock !== 'undefined' ? unlockN : 5;
        this.max = typeof maxQuestions !== 'undefined' ? maxQuestions : -1;
        this.start = Math.round((new Date()).getTime() / 1000),
        this.bracket = this.unlockN;
        this.stats = {
            right : 0,
            wrong : 0,
            streak : 0
        },

        this.getStats = function() {
            return this.stats;
        };
        
        this.getCurrent = function() {
            return this.current;
        };

        this.next = function() {

            if(this.items.length == 1){
                return false;
            }

            if(this.bracket > this.items.length && this.streak == 10) {
                return false;
            }
            
            var ind = this.ind;

            // we only look up to bracket or items.length, whichever is smallest

            var upperBound = this.items.length < this.bracket ?  this.items.length : this.bracket;
            
            // loop until we pick a question different than our current one

            while(this.ind === ind) {
                var y = Math.random()*(Math.pow(upperBound, 2));
                var x = Math.sqrt(y);
                ind   = Math.trunc(x);
            }

            this.ind = ind;
            this.current = this.items[this.ind];

            return true;
            
        };
            
        this.up = function() {

            // user answered the question correctly,
            // shift item left so it's asked less
            // frequently
            
            if(this.ind == 0){
                return;
            }

            // swap items
            var t = this.items[this.ind-1];
            this.items[this.ind-1] = this.items[this.ind];
            this.items[this.ind] = t;
            this.ind = this.ind-1;
            
            // update stats & bracket
            this.stats.right += 1;

            this.stats.streak += 1;
            
            if(this.stats.streak == 10) {
                this.bracket += this.unlockN;
                this.stats.streak = 0;
            }
            
        };
            
        this.down = function(i) {
            
            // user answered the question incorrectly,
            // shift item right so it's asked more
            // frequently
            
            if(this.ind == this.items.length){
                return;
            }

            // swap items
            var t = this.items[this.ind+1];
            this.items[this.ind+1] = this.items[this.ind];
            this.items[this.ind] = t;
            this.ind = this.ind+1;

            // update stats
            this.stats.wrong += 1;
            this.stats.streak = 0;
            
        };

    }

};

angular.module("app.quiz").service("Progression", Progression);

module.exports = Progression;
