"use strict";

var wanakana = require("../lib/wanakana.js");

var ImeDirective = function() {

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
};

angular.module("app.ime").directive("ngIme", ImeDirective);

module.exports = ImeDirective;
