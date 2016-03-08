"use strict";

// returns an array where each element's
// attribute is not null

var removenulls = function(array, attr) {

    var out = [];

    angular.forEach(array, function(v, k) {
        if(v[attr] != null) {
            out.push(v);
        }
    });

    return out;
    
}

// shuffles an array

var shoofle = function(array) {
    var m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

// turns an array into a linked list where
// last.next = first (ring buffer)

var ringify = function(array) {

    var linkedlist = shoofle(array);
        
    for(var i = 0; i < linkedlist.length; i++) {
        linkedlist[i].next = linkedlist[i+1];
        linkedlist[i].last = false;        
    }

    linkedlist[linkedlist.length-1].next = linkedlist[0];
    linkedlist[linkedlist.length-1].last = true;

    return linkedlist;

}

// combines nullify, ringify and shoofle into the
// specific format function we need

var format = function(array){
    return ringify(removenulls(shoofle(array), "character"));    
}

// tracks progress on a given linkedList, and
// provides a next() function to iterate through it

var progression = function(linkedList) {

    return {
        current : linkedList[0],
        count: linkedList.length,
        next : function() {
            
            if(this.current.last) {
                this.count = linkedList.length;
            } else {
                this.count--;
            }
            
            this.current = this.current.next;
        }

    };
    
}

var radicalController = function($resource) {

    var Radicals = $resource("/api/radicals");
    var vm = this;
    
    Radicals.get().$promise.then(function(o){
        angular.extend(vm, {
            questions : new progression(format(o.requested_information))            
        });
    });

}    

var kanjiController = function($resource, $location) {

    var level = $location.path().split("/")[2];
    var Kanji = $resource("/api/kanji/"+level);
    var vm = this;
    
    Kanji.get().$promise.then(function(o){
        angular.extend(vm, {
            questions : new progression(format(o.requested_information))
        });
    });

}

var vocabController = function($resource, $location) {

    var level = $location.path().split("/")[2];    
    var Vocab = $resource("/api/vocabulary/"+level);
    var vm = this;
    
    Vocab.get().$promise.then(function(o){
        angular.extend(vm, {
            questions : new progression(format(o.requested_information))            
        });
    });

}

var config = function($interpolateProvider, $locationProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $locationProvider.html5Mode(true);    
}

var focuschain = function() {
    return {
        restrict: 'AC',
        link: function(vm, elem, attrs) {
            elem.bind("click", function(){
                var name = attrs["focusNext"];
                var elem = angular.element(document.getElementById(name));
                elem[0].focus();
            });            
        },
    };
}

var app = angular.module("quizzer", ["ngResource"]);

app.controller("radicalControl", radicalController);
app.controller("kanjiControl", kanjiController);
app.controller("vocabControl", vocabController);
app.config(config);
app.directive('focusNext', focuschain);
