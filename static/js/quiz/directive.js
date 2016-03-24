"use strict";

var QuizDirective = function() {

    return {
        restrict: "AC",
        templateUrl: '/static/partials/quiz.html'
    }

};

angular.module("app.quiz").directive("ngQuiz", QuizDirective);

module.exports = QuizDirective;