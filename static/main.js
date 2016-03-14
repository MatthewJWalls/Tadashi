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

    for(var i = 0; i < array.length; i++) {
        array[i].next = array[i+1];
        array[i].last = false;
    }

    array[array.length-1].next = array[0];
    array[array.length-1].last = true;

    return array;

}

// process the quiz results into something we can work with.

var format = function(array){
    return ringify(shoofle(array));
}

// tracks progress on a given linkedList, and
// provides a next() function to iterate through it

var Progression = function(array) {

    return {

        current : array[array.length-1],
        items : array,

        next : function() {

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

        },

        up : function(i) {

            // user answered the question correctly,
            // shift item left.

            if(i == 0){
                return;
            }

            var t = this.items[i-1];
            this.items[i-1] = this.items[i];
            this.items[i] = t;

        },

        down : function(i) {

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

}

var QuizController = function($rootScope, $q, $sanitize, ParticleService) {

    var vm = this;

    console.log("Starting");

    var loadQuestionsIntoScope = function(res) {

        var items = ParticleService.all();

        angular.extend(vm, {

            questions : new Progression(format(items)),
            answered : false,
            state : "",
            userInput : "",

            attempt : function() {

                if(vm.questions.current.ime) {
                    vm.userInput = wanakana.toKana(vm.userInput);
                }

                if(vm.checkAnswer(vm.userInput)){
                    vm.state = "has-success";
                    vm.answered = true;
                } else {
                    vm.state = "has-error";
                    vm.answered = true;
                }

            },

            next : function() {
                vm.questions.next();
                vm.answered = false;
                vm.state = "";
                vm.userInput = "";
            },

            checkAnswer : function(ans) {
                var normalisedAns = ans.replace(" ", "\\W*");
                return this.questions.current.answers.filter(
                    function(f){ return f.match(normalisedAns) !== null }
                ).length > 0;
            },

        });

        $rootScope.finished = true;

    };

    loadQuestionsIntoScope();

}

var ParticleService = function($resource, $routeParams) {

    var KanjiResource = $resource("/api/kanji/"+$routeParams.level);

    return {

        all : function() {
            return [{
                item : "に",
                question : "What's that particle?",
                answers : ["time", "destination", "direction"],
                explanation : "に can be thought of as the 'target' of a verb. It can come after time, destination"
            },{
                item : "で",
                question : "What's that particle?",
                answers : ["place", "at", "by way of"],
                explanation : "で denotes the 'how' or 'where' of a verb",
                example : "くるま <strong>で</strong> いきます / to go by car"
            },{
                item : "は",
                question : "What's that particle?",
                answers : ["topic marker", "topic"],
                explanation : "は is the Topic Marker, it places emphasis on what came before it"
            },{
                item : "Topic",
                question : "What's that particle?",
                answers : ["は"],
                explanation : "は is the Topic Marker, it places emphasis on what came before it",
                ime: true
            },{
                item : "にほん <span class='light'>?</span> いきます",
                question : "What's that particle?",
                answers : ["に"],
                explanation : "に can be thought of as the 'target' of a verb. It can come after time, destination, direction",
                ime: true
            }];
        },
    };
}

var imeDirective = function() {

    return {
        restrict: "AC",
        link: function(scope, elem, attrs) {

            elem.bind("keypress", function(event){
                if(event.which == 13){
                    scope.$apply(function() {
                        if(scope.quiz.answered){
                            scope.quiz.next();
                        } else {
                            scope.quiz.attempt();
                        }
                    });
                }
            });

            scope.$watch("quiz.questions.current", function(n, o){
                wanakana.unbind(elem[0]);
                if(scope.finished && scope.quiz.questions.current.ime){
                    wanakana.bind(elem[0]);
                }
            });

        }
    };
}

var app = angular.module("quizzer", ["ngResource", "ngRoute", "ngAnimate", "ngSanitize"]);

app.controller("QuizController", QuizController);
app.factory("ParticleService", ParticleService);
app.directive("ngIme", imeDirective);