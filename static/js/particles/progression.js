"use strict";

var Progression = function() {

    this.init = function(array) {
        this.ind = array.length-1;
        this.current = array[array.length-1];
        this.items = array;
    };

    this.next = function() {

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
        
    }

};

module.exports = Progression;
