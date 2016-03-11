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

    var workingSet = array.filter(function(v, k){
        return v.unlocked && v.character != null;
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
            var normalisedAns = ans.replace(" ", "\\W*");
            return this.current.answers.filter(
                function(f){ return f.match(normalisedAns) !== null }
            ).length > 0;
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

var quizController = function($scope, $q, KanjiService, VocabularyService, RadicalService) {

    var vm = this;

    var promises = [
        KanjiService.all(),
        VocabularyService.all(),
        RadicalService.all()
    ];

    var loadQuestionsIntoScope = function(res) {

        var items = res[0].concat(res[1].concat(res[2]))

        angular.extend(vm, {

            questions : new progression(format(items)),
            answered : false,
            state : "",
            answer : "",

            attempt : function() {

                if(vm.questions.current.ime) {
                    vm.answer = wanakana.toKana(vm.answer);
                }

                if(vm.questions.answer(vm.answer)){
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
                vm.answer = "";
            }

        });

    };

    $q.all(promises).then(loadQuestionsIntoScope);

}

var VocabularyService = function($resource, $routeParams) {

    var VocabularyResource = $resource("/api/vocabulary/"+$routeParams.level);

    return {

        all : function() {
            return VocabularyResource.get().$promise.then(function(res){
                var out = [];
                angular.forEach(res.requested_information, function(v, k) {
                    out.push({
                        type: "vocabulary",
                        character: v.character,
                        question: "Reading",
                        answers: v.kana.split(","),
                        unlocked: v.user_specific != null,
                        background: "purple",
                        ime: true
                    });
                    out.push({
                        type: "vocabulary",
                        character: v.character,
                        question: "Meaning",
                        answers: v.meaning.split(","),
                        unlocked: v.user_specific != null,
                        background: "purple",
                        ime: false
                    });
                });
                return out;
            });
        },
    };
}

var KanjiService = function($resource, $routeParams) {

    var KanjiResource = $resource("/api/kanji/"+$routeParams.level);

    return {

        all : function() {
            return KanjiResource.get().$promise.then(function(res){
                var out = [];
                angular.forEach(res.requested_information, function(v, k) {
                    out.push({
                        type: "kanji",
                        character: v.character,
                        question: "Reading",
                        answers: v[v.important_reading].split(","),
                        unlocked: v.user_specific != null,
                        background: "pink",
                        ime: true
                    });
                    out.push({
                        type: "kanji",
                        character: v.character,
                        question: "Meaning",
                        answers: v.meaning.split(","),
                        unlocked: v.user_specific != null,
                        background: "pink",
                        ime: false
                    });
                });
                return out;
            });
        },
    };
}

var RadicalService = function($resource, $routeParams) {

    var RadicalResource = $resource("/api/radicals/"+$routeParams.level);

    return {

        all : function() {
            return RadicalResource.get().$promise.then(function(res){
                return res.requested_information.map(function(v, k) {
                    return {
                        type: "radical",
                        character: v.character,
                        question: "Meaning",
                        answers: v.meaning.split(","),
                        unlocked: v.user_specific != null,
                        background: "blue",
                        ime: false
                    };
                });
            });
        },
    };
}

var config = function($interpolateProvider, $locationProvider, $routeProvider) {

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $locationProvider.html5Mode(true);

    $routeProvider.when("/:level", {
        templateUrl : "/static/fragments/quizbox.html",
        controller : "quizControl",
        controllerAs : "quiz"
    });

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
                if(angular.isDefined(scope.quiz.questions) && scope.quiz.questions.current.ime){
                    wanakana.bind(elem[0]);
                }
            });

        }
    };
}

var app = angular.module("quizzer", ["ngResource", "ngRoute"]);

app.config(config);
app.controller("quizControl", quizController);
app.factory("RadicalService", RadicalService);
app.factory("KanjiService", KanjiService);
app.factory("VocabularyService", VocabularyService);
app.directive("ngIme", imeDirective);
