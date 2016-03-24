"use strict";

var Progression = function() {

    this.Sequence = function(array, maxQuestions) {

        this.ind = array.length-1;
        this.current = array[array.length-1];
        this.items = array;
        this.count = 0;
        this.max = typeof maxQuestions !== 'undefined' ? maxQuestions : -1;

        this.getCurrent = function() {
            return this.current;
        }

        this.next = function() {

            // if we've reached the end of the progression, return false

            if(this.count == this.max){
                return false;
            }

            // if only one question then we
            // can't get another one.

            if(this.items.length == 1){
                return;
            }

            // items at end of array more likely to be picked
            // than those at the beginning of the array
            
            var ind = this.ind;
            
            // loop until we pick a question different than our current one
            
            while(ind == this.ind) {
                var y = Math.random()*(Math.pow(this.items.length, 2));
                var x = Math.sqrt(y);
                ind   = Math.trunc(x);
            }

            var next  = this.items[ind];

            this.ind = ind;
            this.current = next;
            this.count += 1;

            return true;
            
        };
            
        this.up = function() {

            // user answered the question correctly,
            // shift item left.
            
            if(this.ind == 0){
                return;
            }
            
            var t = this.items[this.ind-1];
            this.items[this.ind-1] = this.items[this.ind];
            this.items[this.ind] = t;
            
        };
            
        this.down = function(i) {
            
            // user answered the question incorrectly,
            // shift item right.
            
            if(this.ind == this.items.length){
                return;
            }
            
            var t = this.items[this.ind+1];
            this.items[this.ind+1] = this.items[this.ind];
            this.items[this.ind] = t;
            
        };

    }

};

angular.module("app.particles").service("Progression", Progression);

module.exports = Progression;
