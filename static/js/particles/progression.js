"use strict";

var Progression = function() {

    this.init = function(array) {
        this.current = array[array.length-1];
        this.items = array;
    };

    this.next = function() {

        // items at end of array more likely to be picked
        // than those at the beginning of the array
        
        var next = this.current;
        
        // loop until we pick a question different than our current one
        
        while(next == this.current) {
            var y = Math.random()*(Math.pow(this.items.length, 2));
            var x = Math.sqrt(y);
            next  = this.items[Math.trunc(x)];
        }
        
        this.current = next;
        
    };
        
    this.up = function(i) {

        // user answered the question correctly,
        // shift item left.
        
        if(i == 0){
            return;
        }
        
        var t = this.items[i-1];
        this.items[i-1] = this.items[i];
        this.items[i] = t;
        
    };
        
    this.down = function(i) {
        
        // user answered the question incorrectly,
        // shift item right.
        
        if(i == this.items.length){
            return;
        }
        
        var t = this.items[i+1];
        this.items[i+1] = this.items[i];
        this.items[i] = t;
        
    }

};

module.exports = Progression;
