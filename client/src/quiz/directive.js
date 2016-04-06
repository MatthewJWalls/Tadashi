"use strict";

/**
 * 
 * Directive for a generic Quiz. The questions are bound into
 * the directive in the template via the "qs" attribute. The
 * controller then picks them up further down the line.
 *  
 */

var QuizDirective = function() {

    return {
        restrict: "AC",
        templateUrl: '/static/partials/quiz.html',
        controller: "QuizController",
        controllerAs: "quiz",
        bindToController: {
            qs : "="
        },
        scope: true
    };

};

angular.module("app.quiz").directive("ngQuiz", QuizDirective);

module.exports = QuizDirective;
