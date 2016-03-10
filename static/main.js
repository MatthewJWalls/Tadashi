"use strict";

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

// process the quiz results array (from the API) into
// something we can work with.

var format = function(array){
    
    var workingSet = []
    
    angular.forEach(array, function(v, k){
        
        var unlocked = v.user_specific != null;
        var hasChar  = v.character != null;
        
        if(unlocked && hasChar) {
            workingSet.push(v);
        }
        
    });
    
    return ringify(shoofle(workingSet));
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

var kanjiController = function($resource, $location, $routeParams) {

    var Kanji = $resource("/api/kanji/"+$routeParams.level);
    var vm = this;
    
    Kanji.get().$promise.then(function(o){
        angular.extend(vm, {
            questions : new progression(format(o.requested_information))
        });
    });

}

var vocabController = function($resource, $location, $routeParams) {

    console.log("vocab controller");
    
    var Vocab = $resource("/api/vocabulary/"+$routeParams.level);
    var vm = this;
    
    Vocab.get().$promise.then(function(o){
        angular.extend(vm, {
            questions : new progression(format(o.requested_information))            
        });
    });

}

var config = function($interpolateProvider, $locationProvider, $routeProvider) {

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $locationProvider.html5Mode(true);

    $routeProvider.when("/kanji/:level", {
        templateUrl : "/static/fragments/kanji.html",
        controller : "kanjiControl",
        controllerAs : "quiz"
    }).when("/vocabulary/:level", {
        templateUrl : "/static/fragments/vocabulary.html",
        controller : "vocabControl",
        controllerAs : "quiz"
    }).when("/radicals", {
        templateUrl : "/static/fragments/radicals.html",
        controller : "radicalControl",
        controllerAs : "quiz"
    });
    
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

var app = angular.module("quizzer", ["ngResource", "ngRoute"]);

app.controller("radicalControl", radicalController);
app.controller("kanjiControl", kanjiController);
app.controller("vocabControl", vocabController);
app.config(config);
app.directive('focusNext', focuschain);
