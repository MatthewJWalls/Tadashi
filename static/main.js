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
        
        if(v.unlocked && v.character != null) {
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
        flagged : [],
        count: linkedList.length,

        answer : function(ans) {
            
            if(this.current.answers.indexOf(ans) != -1) {
                console.log("correct");
            } else {
                console.log("incorrect");
            }
            
        },
        
        next : function() {
            
            if(this.current.last && this.flagged.length > 0) {
                this.lightning();
            } else if(this.current.last) {
                this.count = linkedList.length;
            } else {
                this.count--;
            }
            
            this.current = this.current.next;

        },
        
        flag : function() {
            this.flagged.push(this.current);
        },
        
        lightning : function() {
            this.current = format(this.flagged)[0];
            this.count = this.flagged.length;
        }

    };
    
}

var quizController = function($resource, $location, $routeParams, $scope, QuestionFactory) {

    var apis = {
        kanji : $resource("/api/kanji/"+$routeParams.level),
        radicals : $resource("/api/radicals"),
        vocabulary : $resource("/api/vocabulary/"+$routeParams.level),
    }

    var factories = {
        kanji : QuestionFactory.kanji,
        radicals : QuestionFactory.radicals,
        vocabulary : QuestionFactory.vocabulary
    }
    
    var vm = this;
    
    apis[$routeParams.type].get().$promise.then(function(o){

        var items = factories[$routeParams.type](o.requested_information);

        angular.extend(vm, {
            questions : new progression(format(items))
        });
        
    });

    $scope.$watch("quiz.questions.current", function(thing){

        vm.answer = "";

        if(angular.isDefined(vm.questions) && vm.questions.current.ime){
            wanakana.bind(document.getElementById('ime'));
        } else {
            wanakana.unbind(document.getElementById('ime'));            
        }
    })

}

var QuestionFactory = function() {
    return {
        radicals : function(array) {
            var out = []
            angular.forEach(array, function(v, k) {
                out.push({
                    type: "radical",
                    character: v.character,
                    question: "Meaning",
                    answers: v.meaning.split(","),
                    unlocked: v.user_specific != null,
                    background: "blue",
                    ime : false
                });
            });
            return out;            
        },
        kanji : function(array) {
            var out = []
            angular.forEach(array, function(v, k) {
                out.push({
                    type: "kanji",
                    character: v.character,
                    question: "Reading",
                    answers: v[v.important_reading].split(","),
                    unlocked: v.user_specific != null,
                    background: "pink",
                    ime: true
                });
            });
            return out;
        },
        vocabulary : function(array) {
            var out = []
            angular.forEach(array, function(v, k) {
                out.push({
                    type: "kanji",
                    character: v.character,
                    question: "Reading",
                    answers: v.kana.split(","),
                    unlocked: v.user_specific != null,
                    background: "purple",
                    ime: true
                });
            });
            return out;
        }

    };
}

var config = function($interpolateProvider, $locationProvider, $routeProvider) {

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $locationProvider.html5Mode(true);

    $routeProvider.when("/:type/:level", {
        templateUrl : "/static/fragments/quizbox.html",
        controller : "quizControl",
        controllerAs : "quiz"
    }).when("/:type", {
        templateUrl : "/static/fragments/quizbox.html",
        controller : "quizControl",
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

app.config(config);
app.controller("quizControl", quizController);
app.factory("QuestionFactory", QuestionFactory);
app.directive('focusNext', focuschain);
