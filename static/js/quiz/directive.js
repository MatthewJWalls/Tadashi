"use strict";

var QuizDirective = function() {

    return {
        restrict: "AC",
        templateUrl: '/static/partials/quiz.html',
        controller: "QuizController",
        controllerAs: "quiz",
        bindToController: {
            slide : "=",
            source : "="
        },
        scope: true
    };

};

angular.module("app.quiz").directive("ngQuiz", QuizDirective);

module.exports = QuizDirective;